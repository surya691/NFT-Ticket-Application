/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace TicketMarket {
  export type MarketEventStruct = {
    eventId: BigNumberish;
    uri: string;
    startDate: BigNumberish;
    owner: string;
  };

  export type MarketEventStructOutput = [
    BigNumber,
    string,
    BigNumber,
    string
  ] & { eventId: BigNumber; uri: string; startDate: BigNumber; owner: string };

  export type MarketTicketStruct = {
    tokenId: BigNumberish;
    eventId: BigNumberish;
    seller: string;
    owner: string;
    price: BigNumberish;
    purchaseLimit: BigNumberish;
    totalSupply: BigNumberish;
    sold: boolean;
  };

  export type MarketTicketStructOutput = [
    BigNumber,
    BigNumber,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
  ] & {
    tokenId: BigNumber;
    eventId: BigNumber;
    seller: string;
    owner: string;
    price: BigNumber;
    purchaseLimit: BigNumber;
    totalSupply: BigNumber;
    sold: boolean;
  };
}

export interface TicketMarketInterface extends utils.Interface {
  contractName: "TicketMarket";
  functions: {
    "buyTicket(address,uint256,uint256)": FunctionFragment;
    "createEvent(string,uint64)": FunctionFragment;
    "createMarketTicket(uint256,uint256,address,uint256,uint256,uint256)": FunctionFragment;
    "getAllEvents()": FunctionFragment;
    "getEventTickets(uint256)": FunctionFragment;
    "getMyEvents()": FunctionFragment;
    "getMyTickets()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "buyTicket",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createEvent",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createMarketTicket",
    values: [
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllEvents",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEventTickets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMyEvents",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMyTickets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "buyTicket", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createEvent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMarketTicket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllEvents",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEventTickets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMyEvents",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMyTickets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "MarketEventCreated(uint256,string,uint64,address)": EventFragment;
    "MarketTicketCreated(uint256,uint256,address,address,uint256,uint256,uint256,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MarketEventCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketTicketCreated"): EventFragment;
}

export type MarketEventCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  { eventId: BigNumber; uri: string; startDate: BigNumber; owner: string }
>;

export type MarketEventCreatedEventFilter =
  TypedEventFilter<MarketEventCreatedEvent>;

export type MarketTicketCreatedEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
  ],
  {
    tokenId: BigNumber;
    eventId: BigNumber;
    seller: string;
    owner: string;
    price: BigNumber;
    purchaseLimit: BigNumber;
    totalSupply: BigNumber;
    sold: boolean;
  }
>;

export type MarketTicketCreatedEventFilter =
  TypedEventFilter<MarketTicketCreatedEvent>;

export interface TicketMarket extends BaseContract {
  contractName: "TicketMarket";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TicketMarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    buyTicket(
      nftContract: string,
      tokenId: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createEvent(
      uri: string,
      startDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createMarketTicket(
      eventId: BigNumberish,
      tokenId: BigNumberish,
      nftContract: string,
      purchaseLimit: BigNumberish,
      totalSupply: BigNumberish,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAllEvents(
      overrides?: CallOverrides
    ): Promise<[TicketMarket.MarketEventStructOutput[]]>;

    getEventTickets(
      _eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[TicketMarket.MarketTicketStructOutput[]]>;

    getMyEvents(
      overrides?: CallOverrides
    ): Promise<[TicketMarket.MarketEventStructOutput[]]>;

    getMyTickets(
      overrides?: CallOverrides
    ): Promise<[TicketMarket.MarketTicketStructOutput[]]>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  buyTicket(
    nftContract: string,
    tokenId: BigNumberish,
    amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createEvent(
    uri: string,
    startDate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createMarketTicket(
    eventId: BigNumberish,
    tokenId: BigNumberish,
    nftContract: string,
    purchaseLimit: BigNumberish,
    totalSupply: BigNumberish,
    price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAllEvents(
    overrides?: CallOverrides
  ): Promise<TicketMarket.MarketEventStructOutput[]>;

  getEventTickets(
    _eventId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<TicketMarket.MarketTicketStructOutput[]>;

  getMyEvents(
    overrides?: CallOverrides
  ): Promise<TicketMarket.MarketEventStructOutput[]>;

  getMyTickets(
    overrides?: CallOverrides
  ): Promise<TicketMarket.MarketTicketStructOutput[]>;

  onERC1155BatchReceived(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onERC1155Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    buyTicket(
      nftContract: string,
      tokenId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createEvent(
      uri: string,
      startDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createMarketTicket(
      eventId: BigNumberish,
      tokenId: BigNumberish,
      nftContract: string,
      purchaseLimit: BigNumberish,
      totalSupply: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getAllEvents(
      overrides?: CallOverrides
    ): Promise<TicketMarket.MarketEventStructOutput[]>;

    getEventTickets(
      _eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<TicketMarket.MarketTicketStructOutput[]>;

    getMyEvents(
      overrides?: CallOverrides
    ): Promise<TicketMarket.MarketEventStructOutput[]>;

    getMyTickets(
      overrides?: CallOverrides
    ): Promise<TicketMarket.MarketTicketStructOutput[]>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "MarketEventCreated(uint256,string,uint64,address)"(
      eventId?: BigNumberish | null,
      uri?: null,
      startDate?: null,
      owner?: null
    ): MarketEventCreatedEventFilter;
    MarketEventCreated(
      eventId?: BigNumberish | null,
      uri?: null,
      startDate?: null,
      owner?: null
    ): MarketEventCreatedEventFilter;

    "MarketTicketCreated(uint256,uint256,address,address,uint256,uint256,uint256,bool)"(
      tokenId?: BigNumberish | null,
      eventId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      price?: null,
      purchaseLimit?: null,
      totalSupply?: null,
      sold?: null
    ): MarketTicketCreatedEventFilter;
    MarketTicketCreated(
      tokenId?: BigNumberish | null,
      eventId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      price?: null,
      purchaseLimit?: null,
      totalSupply?: null,
      sold?: null
    ): MarketTicketCreatedEventFilter;
  };

  estimateGas: {
    buyTicket(
      nftContract: string,
      tokenId: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createEvent(
      uri: string,
      startDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createMarketTicket(
      eventId: BigNumberish,
      tokenId: BigNumberish,
      nftContract: string,
      purchaseLimit: BigNumberish,
      totalSupply: BigNumberish,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAllEvents(overrides?: CallOverrides): Promise<BigNumber>;

    getEventTickets(
      _eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMyEvents(overrides?: CallOverrides): Promise<BigNumber>;

    getMyTickets(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buyTicket(
      nftContract: string,
      tokenId: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createEvent(
      uri: string,
      startDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createMarketTicket(
      eventId: BigNumberish,
      tokenId: BigNumberish,
      nftContract: string,
      purchaseLimit: BigNumberish,
      totalSupply: BigNumberish,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAllEvents(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEventTickets(
      _eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMyEvents(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMyTickets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
