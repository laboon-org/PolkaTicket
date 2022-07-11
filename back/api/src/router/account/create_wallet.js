"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("../../fetch/index");
const create_account = require("./create_account");
require('dotenv').config();
const createWallet = `
mutation ($wallet_address:String!) {
    insert_UserWallet(objects: {wallet_address:$wallet_address}) {
      affected_rows
      returning {
        id
        wallet_address
      }
    }
  }
  
`;
const execute = (variables) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchResponse = yield fetch(variables, createWallet);
    const data = yield fetchResponse.json();
    console.log(data.data.insert_UserWallet.returning[0].id);
    if (data.errors == undefined) {
        yield create_account({ address_id: data.data.insert_UserWallet.returning[0].id }).then(((val) => console.log("test123", val)));
    }
    console.log("DEBUG: ", data);
    return data;
});
module.exports = execute;
