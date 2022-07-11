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
var Router = require("router");
const create_qr = require("./create_qr_code");
var router = Router();
var btoas = require('btoa');
const QRCode = require('qrcode');
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticket_id } = req.body.input;
    try {
        let img = "";
        const segs = btoas(ticket_id);
        let qr = yield QRCode.toDataURL(segs);
        const data = create_qr({ id: ticket_id, qrcode: qr });
        return res.json({
            data: {
                qrcode: qr
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Không thể sinh mã qr");
    }
}));
module.exports = router;
