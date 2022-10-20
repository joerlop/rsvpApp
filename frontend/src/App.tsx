import React, { useEffect, useState } from "react";
import { Wallet } from "fuels";
import "./App.css";
// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { EventPlatformAbi__factory } from "./contracts";
// The address of the contract deployed the Fuel testnet
const CONTRACT_ID = `${process.env.REACT_APP_CONTRACT_ID}`;
//the private key from createWallet.js
const WALLET_SECRET = `${process.env.REACT_APP_WALLET_SECRET}`;
// Create a Wallet from given secretKey in this case
// The one we configured at the chainConfig.json
const wallet = new Wallet(WALLET_SECRET, "https://node-beta-1.fuel.network/graphql");
// Connects out Contract instance to the deployed contract
// address using the given wallet.
const contract = EventPlatformAbi__factory.connect(CONTRACT_ID, wallet);

const delay = 5;

export default function App(){
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState(Number(0));
  const [eventName, setEventName] = useState('')
  const [maxCap, setMaxCap] = useState(Number(0))
  const [deposit, setDeposit] = useState(Number(0))
  const [eventCreation, setEventCreation] = useState(false);
  const [rsvpConfirmed, setRSVPConfirmed] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    console.log("eventName", eventName);
    console.log("deposit", deposit);
    console.log("max cap", maxCap);
  },[eventName, maxCap, deposit]);

  async function rsvpToEvent(){
    setLoading(true);
    try {
      const { value } = await contract.functions
        .rsvp(eventId)
        .txParams({gasPrice: 2})
        .call();
      console.log("RSVP'd to the following event", value);
      console.log("deposit value", value.price.toString());
      setEventName(value.name.toString());
      setEventId(value.uniqueId.toNumber());
      setMaxCap(value.capacity.toNumber());
      setDeposit(value.price.toNumber());
      console.log("event name", value.name);
      console.log("event capacity", value.capacity.toString());
      console.log("eventID", value.uniqueId.toString()) 
      setRSVPConfirmed(true);
      alert("rsvp successful")
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false)
    }
  }

  async function createEvent(e: any){
    e.preventDefault();
    setLoading(true);
    try {
      console.log("creating event")
      const { value } = await contract.functions.create_event(eventName, deposit, maxCap).txParams({gasPrice: 1}).call();

      console.log("return of create event", value);
      console.log("deposit value", value.price.toString());
      console.log("event name", value.name);
      console.log("event capacity", value.capacity.toString());
      console.log("eventID", value.uniqueId.toString())
      setEventId(value.uniqueId.toNumber())
      setEventCreation(true)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false);
    }
  }
return (
  <div>
    <form id="createEventForm" onSubmit={createEvent}>
    <input value = {eventName} onChange={e => setEventName(e.target.value) }name="eventName" type="text" placeholder="Enter event name" />
      <input value = {maxCap} onChange={e => setMaxCap(Number(e.target.value))} name="capacity" type="text" placeholder="Enter max capacity" />
      <input value = {deposit} onChange={e => setDeposit(Number(e.target.value))} name="price" type="number" placeholder="Enter price" />
      <button disabled={loading}>
        {loading ? "creating..." : "create"}
      </button>
    </form>
    <div>
      <input name="eventId" onChange={e => setEventId(Number(e.target.value))} placeholder="pass in the eventID"/>
      <button onClick={rsvpToEvent}>RSVP</button>
    </div>
    <div> 
    {eventCreation &&
    <>
    <h1> New event created</h1>
    <h2> Event Name: {eventName} </h2>
    <h2> Event ID: {eventId}</h2>
    <h2>Max capacity: {maxCap}</h2>
    <h2>Deposit: {deposit}</h2>
    </>
    }
    </div> 
    <div>
    {rsvpConfirmed && <>
    <h1>RSVP Confirmed to the following event: {eventName}</h1>
    </>}
    </div>
  </div>
);
}