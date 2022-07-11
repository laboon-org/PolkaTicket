var Router = require("router");
var router = Router();
const get_tickets = require("./get_ticket");
const update_ticket = require("./close_ticket");
const create_ticket = require("./create_ticket");
const create_buy_ticket = require("./create_buy_ticket");
const get_account = require("../account/get_account");
const create_user_access = require("./create_approver");
const get_user_access = require("../account/get_user_access");
const create_exchange = require("./create_exchange")
const update_account = require("../account/update_account")
var moment = require("moment-timezone");
router.post("/close", async (req: any, res: any) => {
  const data = req.body.event.data.new;
  try {
    if (data.status == 2) {
      const event = data.id;
      const ticket = await get_tickets({ event });
      const list_ticket = ticket.data.TicketTokens;
      for (var i in list_ticket) {
        const data = update_ticket({ id: list_ticket[i].id });
        console.log(data);
      }
      console.log("test12345", ticket.data);
      return res.send("Đã update thành công");
    }
  } catch {
    return res.send("Update không thành công");
  }
});
router.post("/create", async (req: any, res: any) => {
  const {
    create_at,
    user_id,
    type,
    event,
    owner_address,
    ticket_type,
    supply,
    approver,
    price
  } = req.body.input;
  var dem:any=0;
  try {
    for (var i = 0; i < supply; i++) {
      const data = await create_ticket({
        create_at,
        user_id,
        type,
        event,
        owner_address,
        approver,
        ticket_type,
        price
      });
      console.log("test123", data);
      dem=dem+1
      console.log("dem",dem)
    }
    const account= await get_account(owner_address)
    console.log(account)
    const ticket_issued = account.data.UserNonce[0].ticket_issued+dem
    const update = await update_account({wallet_address:owner_address,input:{ticket_issued}})
    console.log(update,account)
    return res.status(200).json({
      data: {
        mes: "Tạo vé thành công",
      },
    });
  } catch {
    return res.send("Tạo không thành công");
  }
});
router.post("/createbuy", async (req: any, res: any) => {
  const { create_at, ticket_id, user_id, owner_address,id_transaction } = req.body.input;
  try {
    const data = await create_buy_ticket({
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
  } catch { 
    return res.send("Tạo không thành công");
  }
});
router.post("/approved/create", async (req: any, res: any) => {
  const data = req.body.event.data.new;
  var dateGet = moment(new Date())
    .tz("Asia/Bangkok")
    .format("YYYY-MM-DD HH:mm");
  try {
    const ticket_id = data.id;
    const wallet_address: any = data.approver != null && data.approver;
    const account = await get_account(wallet_address);
    for (var i in account.data.UserNonce) {
      const create_acces = await create_user_access({
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
  } catch {
    return res.send("Tạo không thành công");
  }
});
router.post("/approve", async (req: any, res: any) => {
  const { user_id, token } = req.body.input;
  try {
    const data = await get_user_access({ user_id, token });
    if (data.data.UserAccessToken.length > 0) {
      const data = await update_ticket({ id: token });
      console.log(data)
      return res.status(200).json({
        data:{
          mes: "Great! Your ticket check has been successful.",
        }
      });
    } else {
      res.status(201).json({
        data:{
          mes: "Bạn không có quyên phê duyệt vé",
        }
      });
    }
  } catch {
    return res.send(
      "Sorry! Your ticket has been used. Please try again with a QR code."
    );
  }
});
router.post("/create_exchange", async (req: any, res: any) => {
  const { create_at, ticket_id, owner_address } = req.body.input;
 
  try {
    const account = await get_account(owner_address);
    console.log(account)

    const data = await create_exchange({
      create_at,
      ticket_id,
      user_id:account.data.UserNonce[0].id,
      owner_address,

    });
    console.log(data);
    return res.status(200).json({
      data: {
        mes: "Tạo vé thành công",
      },
    });
  } catch {
    return res.send("Tạo không thành công");
  }
});

module.exports = router;
