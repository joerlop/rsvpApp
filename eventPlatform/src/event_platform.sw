library event_platform;

use std::{
    identity::Identity,
    contract_id::ContractId
};

abi eventPlatform {
    #[storage(read, write)]
    fn create_event(name: str[10], price: u64, capacity: u64) -> Event;

    #[storage(read, write)]
    fn rsvp(eventId: u64) -> Event;
}

pub struct Event {
    uniqueId: u64,
    owner: Identity,
    name: str[10],
    price: u64,
    capacity: u64,
    numOfRSVPs: u64
}