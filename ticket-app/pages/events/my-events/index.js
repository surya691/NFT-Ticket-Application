import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Card.module.scss";
import axios from "axios";

import { signers } from "../../../components/contracts";

export default function myEvents() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const contracts = await signers();
      const { signedMarketContract } = contracts;

      const data = await signedMarketContract.getMyEvents();
      console.log(data);

      const allEvents = await Promise.all(
        data.map(async (i) => {
          const eventUri = await i.uri;
          if (!eventUri) {
            throw new Error(
              `Event URI does not exist for Event Id ${i.eventId.toNumber()}`
            );
          }
          const eventRequest = await axios.get(eventUri);
          const eventData = eventRequest.data;
          let ticketRemaining =
            i.ticketTotal.toNumber() - i.ticketsSold.toNumber();
          console.log("EVENT DATA = ", eventData);
          let currEvent = {
            eventId: i.eventId.toNumber(),
            name: eventData.name,
            description: eventData.description,
            imageUri: eventData.image,
            location: eventData.location,
            startDate: eventData.eventDate,
            ticketTotal: i.ticketTotal.toNumber(),
            ticketRemaining,
            owner: i.owner,
          };
          console.log(
            "Event ",
            currEvent.eventId,
            " owner = ",
            currEvent.owner
          );
          return currEvent;
        })
      );
      console.log("ALL EVENTS: ", allEvents);
      setEvents(allEvents);
      setLoadingState(true);
    } catch (error) {
      console.log(error);
      error.data === undefined
        ? setErr(error.message)
        : setErr(error.data.message);
      setLoadingState(true);
    }
  }

  if (!loadingState) {
    return <h1 className="container display-1">Loading...</h1>;
  }

  if (err) {
    <div className="container text-center">
      <h1>Your Events</h1>
      <p className="text-red display-6">{err}</p>
    </div>;
  }

  if (!events.length) {
    return (
      <div className="container">
        <h1 className="display-6">You have created no events</h1>
        <p className="fw-bold">
          <Link href={`/events/create`}>
            <a className="mr-6">Create Event -&gt;</a>
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container justify-content-center text-center align-items-center">
      <h1 className="m-4">All Events</h1>
      <div className="row justify-content-center align-items-center">
        {events.map((event) => (
          <div key={event.eventId} className="col-7 col-md-5 col-lg-3 ">
            <div className="card border border-secondary shadow rounded-l overflow-scroll m-3 w-100">
              <div className="card-header mb-2">
                <Link href={`/events/my-events/${event.eventId}`}>
                  <a>
                    View Event Details <i className="bi bi-eye-fill"></i>
                  </a>
                </Link>
              </div>
              <img src={event.imageUri} className={styles.cardImgTop} />
              <div className="card-body">
                <div style={{ height: "60px", overflow: "auto" }}>
                  <h5 className="card-title text-center">
                    <span className="fw-bold text-primary">{event.name}</span> -
                    ID: {event.eventId}
                  </h5>
                </div>
                <div style={{ height: "55px", overflow: "auto" }}>
                  <p className="">{event.description}</p>
                </div>
                <div style={{ height: "40px", overflow: "auto" }}>
                  <p className="">
                    <i className="bi bi-calendar3"></i> {event.startDate}
                  </p>
                </div>
                <div style={{ height: "40", overflow: "auto" }}>
                  <p className="">
                    <i className="bi bi-geo-alt-fill"></i> {event.location}
                  </p>
                </div>
                <Link href={`/events/validate/${event.eventId}`}>
                  <a>
                    Validate Event{" "}
                    <i className="bi bi-arrow-right-circle-fill"></i>
                  </a>
                </Link>
              </div>
              <div className="card-footer bg-primary">
                <p className="text-light fw-bold">
                  Tickets Supplied: {event.ticketTotal}
                </p>
                {event.ticketRemaining > 0 ? (
                  <p className="text-cream fw-bold">
                    Tickets Remaining: {event.ticketRemaining}
                  </p>
                ) : (
                  <p className="text-light fw-bold">
                    Tickets Remaining: {event.ticketRemaining}
                  </p>
                )}
                <button
                  style={{ backgroundColor: "#eee8a9" }}
                  className="btn fw-bold text-primary"
                  onClick={() => {
                    router.push(`/tickets/create/${event.eventId}`);
                  }}
                >
                  Create Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-lg btn-primary"
        onClick={() => {
          router.push("/events/create/");
        }}
      >
        Create Event
      </button>
    </div>
  );
}
