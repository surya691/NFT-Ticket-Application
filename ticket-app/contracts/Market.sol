// SPDX-License-Identifier: MIT
 pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import "hardhat/console.sol";

contract NFTMarket is ERC1155, IERC1155Receiver, ERC165{
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _eventIds;

  //Used by tutorial as an address to receive listing fees - can't charge people as this is a FYP project unfortunately
  address payable owner;

  mapping(uint256 => MarketEvent) private idToMarketEvent;
  mapping(uint256 => MarketTicket) private idToMarketTicket;

  struct MarketEvent {
    uint eventId;
    string name;
    string description;
    string imageUri;
    string location;
    uint64 eventStartDate;
    address owner;
    uint[] tickets;
  }

  struct MarketTicket {
    uint256 tokenId;
    uint eventId;
    address payable seller;
    address payable owner;
    uint256 price;
    uint256 purchaseLimit;
    uint256 totalSupply;
    bool sold;
  }

  event MarketEventCreated (
    uint indexed eventId,
    string name,
    string description,
    string imageUri,
    string location,
    uint64 eventStartDate,
    address owner,
    uint[] tickets
  );

  event MarketTicketCreated (
    uint indexed ticketId,
    uint indexed eventId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    uint256 purchaseLimit,
    uint256 totalSupply,
    bool sold
  );

  constructor() ERC1155(tokenURI) {
    owner = payable(msg.sender);
  }

//Mints token and then lists it in the marketplace
  function createToken(uint64 amount, uint256 eventId, uint256 purchaseLimit, uint256 totalSupply, uint256 price) public returns (uint) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //use eventID for the metadata

        //TODO - Add a check to see token creator owns the event, but then again i can just check this on market contract and not allow listing if token owner doesn't match event owner - ok i'll do this lols

        _mint(msg.sender, newTokenId, amount, "");
        createTicket(eventId, amount, newTokenId, purchaseLimit, totalSupply, price); 
        return newTokenId;
    }

  //What this function does is allow a custom uri for a token which doesn't need to follow {id} structure
  function uri(uint256 tokenID) override public view returns (string memory) {
        return(
            string(abi.encodePacked(
                "URL",
                Strings.toString(tokenID),
                ".json"
            ))
        );
    }
}

   /* Places an item for sale on the marketplace */
  function createEvent(
    string name,
    string description,
    string imageUri,
    string location,
    uint64 eventStartDate
  ) public {
      // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    require((uint64(now) < eventStartDate), "Date has already passed");
    _eventIds.increment();
    // check if a token exists with the above token id => incremented counter
    require(!_exists(_eventIds));
    uint256 eventId = _eventIds.current();

    uint[] eventTickets;
  
    idToMarketEvent[eventId] =  MarketEvent(
      eventId,
      name,
      description,
      imageUri,
      location,
      eventStartDate,
      msg.sender,
      eventTickets
    );

    emit MarketEventCreated(
      eventId,
      name,
      description,
      imageUri,
      location,
      eventStartDate,
      msg.sender,
      eventTickets
    );
  }

   /* Places a ticket for sale on the marketplace */
  function createMarketTicket(
    uint256 eventId,
    uint256 amount,
    uint256 tokenId,
    uint256 purchaseLimit,
    uint256 totalSupply,
    uint256 price
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");

    //check user owns NFT before listing it on the market
    require(balanceOf(msg.sender, tokenId)>= amount, "You do not own the NFT ticket you are trying to list");
    //check msg sender owns event
    require(idToMarketEvent[eventId].owner == msg.sender, "You do not own this event");
    //Check event has not already passed
    require((uint64(now) < idToMarketEvent[eventId].eventStartDate), "Event has already passed");
  
    idToMarketTicket[tokenId] =  MarketTicket(
      tokenId,
      eventId,
      payable(msg.sender),
      payable(address(0)),
      price,
      purchaseLimit,
      totalSupply,
      false
    );

    //TODO - Double check this is the correct format for transfer
    safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

    emit MarketTicketCreated(
      tokenId,
      eventId,
      msg.sender,
      address(0),
      price,
      purchaseLimit,
      totalSupply,
      false
    );
  }

  function buyTicket(
    address nftContract,
    uint256 ticketId,
    uint256 amount
    ) public payable nonReentrant {
    uint price = idToMarketTicket[ticketId].price;
    uint tokenId = idToMarketTicket[ticketId].tokenId;
    uint limit = idToMarketTicket[ticketId].purchaseLimit;
    require(amount <= IERC1155(nftContract).balanceOf(address(this), tokenId), "You've requested to buy more tickets that are remaining on the marketplace");
    require(amount <= limit - IERC1155(nftContract).balanceOf(msg.sender, tokenId), "You have exceeded the maximum amount of tickets you are allowed to purchase");
    require(msg.value == price * amount, "Not enough money sent");
    require((uint64(now) < idToMarketEvent[idToMarketTicket[ticketId]].eventStartDate), "Event has already passed");

    //TODO make sure the event hasn't started
    idToMarketTicket[ticketId].seller.transfer(msg.value);
    IERC1155(nftContract).transferFrom(address(this), msg.sender, tokenId, amount);
    idToMarketTicket[itemId].owner = payable(msg.sender);
    idToMarketTicket[itemId].sold = true;
  }



  /* Getters */
  /// @title A title that should describe the contract/interface
  /// @author The name of the author
  /// @notice Explain to an end user what this does
  /// @dev Explain to a developer any extra details
  
  /* Returns only events that a user has created */
  function getMyEvents() public view returns (MarketEvent[] memory) {
    uint totalEventCount = _eventIds.current();
    uint eventCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalEventCount; i++) {
      if (idToMarketEvent[i + 1].owner == msg.sender) {
        eventCount += 1;
      }
    }

    MarketEvent[] memory userEvents = new MarketEvent[](eventCount);
    for (uint i = 0; i < totalEventCount; i++) {
      if (idToMarketEvent[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        MarketEvent storage currentEvent = idToMarketEvent[currentId];
        userEvents[currentIndex] = currentEvent;
        currentIndex += 1;
      }
    }
    return userEvents;
  }

   function getAllEvents() public view returns (MarketEvent[] memory) {
    uint totalEventCount = _eventIds.current();
    uint eventCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalEventCount; i++) {
      if ((uint64(now) < idToMarketEvent[eventId].eventStartDate)) {
        eventCount += 1;
      }
    }
    MarketEvent[] memory userEvents = new MarketEvent[](eventCount);
    for (uint i = 0; i < totalEventCount; i++) {
      if ((uint64(now) < idToMarketEvent[eventId].eventStartDate)) {
        uint currentId = i + 1;
        MarketEvent storage currentEvent = idToMarketEvent[currentId];
        userEvents[currentIndex] = currentEvent;
        currentIndex += 1;
      }
    }
    return userEvents;
   }

   function getMyTickets() public view returns (MarketTicket[] memory) {
    uint totalTicketCount = _ticketIds.current();
    uint ticketCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalTicketCount; i++) {
      if (idToMarketTicket[i + 1].owner == msg.sender) {
        ticketCount += 1;
      }
    }

    //TODO - How to store a user's tickets

    MarketTicket[] memory userTickets = new MarketTicket[](ticketCount);
    for (uint i = 0; i < totalTicketCount; i++) {
      if (idToMarketTicket[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        MarketTicket storage currentTicket = idToMarketTicket[currentId];
        userTickets[currentIndex] = currentTicket;
        currentIndex += 1;
      }
    }
    return userTickets;
  }

  

  //Required functions to receive ERC1155 tokens
  function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data) override external returns (bytes4) {
      return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
  }
  
  function onERC1155BatchReceived(address operator, address from, uint256[] ids, uint256[] values, bytes calldata data) override external returns (bytes4) {
      bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
      return super.supportsInterface(interfaceId);
  }
}


/**
    Will have purchase NFT Ticket by taking ID of ticket type you want to buy and amount as parameters
    This function will check that the marketplace has enough balance of the NFT for the amount you want to purchase
    You check if the buyer sent a moeney and transer from the marketplace address which is "address(this)" to buyer

    The marketplace will call the event contract and ticket contract to make new versions of each - or maybe event isn't needed and can be stored in marketplace
    I will append the new ticket to ticket array, then I will set the tickets ID to its place in the array. Ticket constructer will have marketplace address, and ticket script will have createToken
    function which takes in tokenID, amount, eventID

    We'll have a var called total tickets which is set to tickets array length
    We'll also have a var called ticket supply which is the available tickets we for an event which event owner has ability to change by being able to add extra or remove extra tickets
    To modifiy a ticket supply, I will have the ticket contract have modify function which takes the ticket ID and either creates the extra amount, or deletes extra amount if 

    The user will be miniting the nft themselves so we can keep track of original owner and this will get transferrred to the marketplace immediately in the nft contract.
    Then our code will pass these details to the marketplace contract which keeps track of the nftcontract in order to transfer the nft to the market address, and to know the token id and creator
    NFT is minted first, then we go to the market and create the market ticket

    STORE EVENTS
    To store tickets and events I can loop through map each time, then check if each index is free. Think I need to give users the option to burn tickets. Maybe
    also find a way to delete all unpurchased events after data of event passes
    I think its best to remove any events the day after it has occured, but I could still keep the ticket type. Mainly because its very inefficient 
    to loop through a long list of events to see which ones are still happening or not

    To get events tickets availiable just loop through each ticketID in the event's ticket array, than add to a counter the balance the marketplace has of that token/ticket

    EVENT CONTRACT
    He has an array of tickets which has a datatype of things like price etc. Then when someoen buys a ticket, a new ticket type is created and given the id of its place in the array,
    and then a new NFT is minted and its tokenID is the place in the array of the ticket, and the minted owner of the nft is the purchaser

    OTHER GUYS CONTRACT
    Each NFT has its own script associated with it, so when someone creates a token, they are also creating a new NFT contract
    He has a mapping of ids->MarketTicket to store all the market items in the market. Each item as its own market item id and a seperate token ID
    TokenID is given with a counter within the nft contract

    As user has access to the NFT contract and can mint the NFT, 
    Set approval for all gives another contract(e.g. our marketplace) the ability transfact the token to differen users.
    We also return the token id so that in the front end we can do stuff with the token id such as put it for sale

    So to list an item on the market, a user will interact with the front ent and he mints the nft, then we transfer that nft from the user to the marketplace

    balanceOf checks the quantity of a specific token that a contract has x


    OLD TICKET CONTRACT NOTES
     Marketplace{
        All events

    }

    Event{
        Name
        Description
        Start Date
        Creator
    }

    Ticket{
        Event ID
        Price
        Owner
        *Availability
    }



    *Create an empty event
    *We must map all the events to the correct creater

    //Withdraw is used to make sure you are the only one who can withdraw from a contract

    Ticket contract just mints the required amount of your asset with an ID alongside it, e.g. 1 for SWORD, 2 for ARMOUR
    https://www.youtube.com/watch?v=PakCemMvY58&list=LL&index=20
 */
