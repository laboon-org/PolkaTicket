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
exports.ipfs = void 0;
const ipfs_http_client_1 = require("ipfs-http-client");
const id = "2BT4sEB6gZ6reCeQt5sNMmiEHix";
const sercet = "09dd2787c6b551987be40e4c55807042";
const INFURA_TOKEN = Buffer.from(`${id}:${sercet}`).toString("base64");
exports.ipfs = (0, ipfs_http_client_1.create)({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: "Basic " + INFURA_TOKEN,
    },
});
const uploadImageToIPFS = (imageBase64) => __awaiter(void 0, void 0, void 0, function* () {
    var base64EncodedImageString = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const cidObj = yield exports.ipfs.add(base64EncodedImageString);
    console.log(cidObj);
    return {
        url: `ipfs://${cidObj.path}`,
        cid: cidObj
    };
});
module.exports = uploadImageToIPFS;
