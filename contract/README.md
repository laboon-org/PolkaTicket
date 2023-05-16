# Smart Contract

- Acala

## Getting Started

- https://evmdocs.acala.network/network/predeployed-smart-contracts/details

## Service

- https://riot.im/app/#/room/#acala-faucet:matrix.org

## Network

- https://blockscout.acala.network/

## Guide

- https://evmdocs.acala.network/tutorials/truffle-tutorials/helloworld-tutorial#setup-an-empty-truffle-project (WIP)

## Features

(Event:Methods)
- [ ] buyTicket
- [ ] listingTickets
- [ ] getTicketItem
- [ ] getListTicketItems
(Event:Object)
- TicketItem

(Ticket:Methods)
- [ ] addAdmin
- [ ] removeAdmin
- [ ] setAdminEvent
- [ ] setTicketChecker
- [ ] createTickets
- [ ] setTicketUsed
- [ ] setBatchTicketUsed
- [ ] verifyAdmin
- [ ] getTicket
- [ ] getListTicket

## Fix Policy on Win

```sh
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Set-ExecutionPolicy -ExecutionPolicy AllSigned -Scope LocalMachine
```