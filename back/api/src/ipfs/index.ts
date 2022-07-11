import { create } from "ipfs-http-client";
import { fromString } from "uint8arrays/from-string";

const id = "2BT4sEB6gZ6reCeQt5sNMmiEHix";
const sercet = "09dd2787c6b551987be40e4c55807042";
const INFURA_TOKEN = Buffer.from(`${id}:${sercet}`).toString("base64");

export const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: "Basic " + INFURA_TOKEN,
  },
});
const uploadImageToIPFS = async (
  imageBase64: any,

): Promise<{ url: string,cid:any }> => {
  var base64EncodedImageString = imageBase64.replace(
    /^data:image\/\w+;base64,/,
    ""
  );
  const cidObj = await ipfs.add(base64EncodedImageString);
  console.log(cidObj)
  return {
    url: `ipfs://${cidObj.path}`,
    cid: cidObj
  };
};

module.exports = uploadImageToIPFS;
export {};
