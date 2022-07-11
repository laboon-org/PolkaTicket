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
var router = Router();
const get_tickets = require("./get_ticket");
const update_ticket = require("./close_ticket");
const create_ticket = require("./create_ticket");
const create_buy_ticket = require("./create_buy_ticket");
const get_account = require("../account/get_account");
const create_user_access = require("./create_approver");
const get_user_access = require("../account/get_user_access");
const create_exchange = require("./create_exchange");
var moment = require("moment-timezone");
router.post("/close", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.event.data.new;
    try {
        if (data.status == 2) {
            const event = data.id;
            const ticket = yield get_tickets({ event });
            const list_ticket = ticket.data.TicketTokens;
            for (var i in list_ticket) {
                const data = update_ticket({ id: list_ticket[i].id });
                console.log(data);
            }
            console.log("test12345", ticket.data);
            return res.send("Đã update thành công");
        }
    }
    catch (_a) {
        return res.send("Update không thành công");
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { create_at, user_id, type, event, owner_address, ticket_type, supply, approver, } = req.body.input;
    try {
        for (var i = 0; i < supply; i++) {
            const data = yield create_ticket({
                create_at,
                user_id,
                type,
                event,
                owner_address,
                approver,
                ticket_type,
            });
            console.log("test123", data);
        }
        return res.status(200).json({
            data: {
                mes: "Tạo vé thành công",
            },
        });
    }
    catch (_b) {
        return res.send("Tạo không thành công");
    }
}));
router.post("/createbuy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { create_at, ticket_id, user_id, owner_address, id_transaction } = req.body.input;
    try {
        const data = yield create_buy_ticket({
            create_at,
            ticket_id,
            user_id,
            owner_address,
            id_transaction
        });
        console.log(data);
        return res.status(200).json({
            data: {
                mes: "Tạo vé thành công",
            },
        });
    }
    catch (_c) {
        return res.send("Tạo không thành công");
    }
}));
router.post("/approved/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.event.data.new;
    var dateGet = moment(new Date())
        .tz("Asia/Bangkok")
        .format("YYYY-MM-DD HH:mm");
    try {
        const ticket_id = data.id;
        const wallet_address = data.approver != null && data.approver;
        const account = yield get_account(wallet_address);
        for (var i in account.data.UserNonce) {
            const create_acces = yield create_user_access({
                token: ticket_id,
                user_id: account.data.UserNonce[i].id,
                expires_at: dateGet,
            });
            console.log(create_acces);
        }
        console.log(account);
        return res.status(200).json({
            data: {
                mes: "Great! Your event ticket has been issued successfully",
            },
        });
    }
    catch (_d) {
        return res.send("Tạo không thành công");
    }
}));
router.post("/approve", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, token } = req.body.input;
    try {
        const data = yield get_user_access({ user_id, token });
        if (data.data.UserAccessToken.length > 0) {
            const data = yield update_ticket({ id: token });
            console.log(data);
            return res.status(200).json({
                data: {
                    mes: "Great! Your ticket check has been successful.",
                }
            });
        }
        else {
            res.status(201).json({
                data: {
                    mes: "Bạn không có quyên phê duyệt vé",
                }
            });
        }
    }
    catch (_e) {
        return res.send("Sorry! Your ticket has been used. Please try again with a QR code.");
    }
}));
router.post("/create_exchange", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { create_at, ticket_id, owner_address } = req.body.input;
    try {
        const account = yield get_account(owner_address);
        console.log(account);
        const data = yield create_exchange({
            create_at,
            ticket_id,
            user_id: account.data.UserNonce[0].id,
            owner_address,
        });
        console.log(data);
        return res.status(200).json({
            data: {
                mes: "Tạo vé thành công",
            },
        });
    }
    catch (_f) {
        return res.send("Tạo không thành công");
    }
}));
module.exports = router;
