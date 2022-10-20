/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider, Wallet, AbstractAddress } from "fuels";
import { Interface, Contract } from "fuels";
import type {
  EventPlatformAbi,
  EventPlatformAbiInterface,
} from "../EventPlatformAbi";
const _abi = [
  {
    type: "function",
    name: "create_event",
    inputs: [
      {
        type: "str[10]",
        name: "eventName",
      },
      {
        type: "u64",
        name: "eventPrice",
      },
      {
        type: "u64",
        name: "eventCapacity",
      },
    ],
    outputs: [
      {
        type: "struct Event",
        name: "",
        components: [
          {
            type: "u64",
            name: "uniqueId",
          },
          {
            type: "enum Identity",
            name: "owner",
            components: [
              {
                type: "struct Address",
                name: "Address",
                components: [
                  {
                    type: "b256",
                    name: "value",
                  },
                ],
              },
              {
                type: "struct ContractId",
                name: "ContractId",
                components: [
                  {
                    type: "b256",
                    name: "value",
                  },
                ],
              },
            ],
          },
          {
            type: "str[10]",
            name: "name",
          },
          {
            type: "u64",
            name: "price",
          },
          {
            type: "u64",
            name: "capacity",
          },
          {
            type: "u64",
            name: "numOfRSVPs",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "rsvp",
    inputs: [
      {
        type: "u64",
        name: "eventId",
      },
    ],
    outputs: [
      {
        type: "struct Event",
        name: "",
        components: [
          {
            type: "u64",
            name: "uniqueId",
          },
          {
            type: "enum Identity",
            name: "owner",
            components: [
              {
                type: "struct Address",
                name: "Address",
                components: [
                  {
                    type: "b256",
                    name: "value",
                  },
                ],
              },
              {
                type: "struct ContractId",
                name: "ContractId",
                components: [
                  {
                    type: "b256",
                    name: "value",
                  },
                ],
              },
            ],
          },
          {
            type: "str[10]",
            name: "name",
          },
          {
            type: "u64",
            name: "price",
          },
          {
            type: "u64",
            name: "capacity",
          },
          {
            type: "u64",
            name: "numOfRSVPs",
          },
        ],
      },
    ],
  },
];

export class EventPlatformAbi__factory {
  static readonly abi = _abi;
  static createInterface(): EventPlatformAbiInterface {
    return new Interface(_abi) as unknown as EventPlatformAbiInterface;
  }
  static connect(
    id: string | AbstractAddress,
    walletOrProvider: Wallet | Provider
  ): EventPlatformAbi {
    return new Contract(
      id,
      _abi,
      walletOrProvider
    ) as unknown as EventPlatformAbi;
  }
}