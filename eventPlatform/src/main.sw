contract;

dep event_platform;
use event_platform::*;

use std::{
    identity::Identity,
    contract_id::ContractId,
    storage::StorageMap,
    chain::auth::{AuthError, msg_sender},
    context::{call_frames::msg_asset_id, msg_amount, this_balance},
    result::Result
};

storage {
    events: StorageMap<u64, Event> = StorageMap {},
    event_id_counter: u64 = 0
}

impl eventPlatform for Contract {

    #[storage(read, write)]
    fn create_event(eventName: str[10], eventPrice: u64, eventCapacity: u64) -> Event {
        let event_id = storage.event_id_counter;
        let newEvent = Event {
            uniqueId: event_id,
            owner: msg_sender().unwrap(),
            name: eventName,
            price: eventPrice,
            capacity: eventCapacity,
            numOfRSVPs: 0
        };

        storage.events.insert(event_id, newEvent);
        storage.event_id_counter += 1;

        let mut eventAdded = storage.events.get(storage.event_id_counter - 1);
        return eventAdded;
    }

    #[storage(read, write)]
    fn rsvp(eventId: u64) -> Event {
        let mut eventToRSVP = storage.events.get(eventId);
        
        if (eventId > storage.event_id_counter) {
            let fallback = storage.events.get(0);
            return fallback;
        }

        eventToRSVP.numOfRSVPs += 1;
        storage.events.insert(eventId, eventToRSVP);
        return eventToRSVP;
    }
}