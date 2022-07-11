var Router = require("router");
var router = Router();
const get_account_id = require("../account/get_account_id");
const get_ticket_id = require("./get_ticket_id");
const statistic = require("../account/update_account");
router.post("/sold", async (req: any, res: any) => {
  const data = req.body.event.data.new;
  try {
    const account = await get_account_id({ id: data.user_id });
    const ticket = await get_ticket_id({ id: data.ticket_id });

    console.log(ticket, account);
    if (data.type == 1 && data.status == 2) {
      console.log("test");
      var ticket_one_time_use = 0;
      var ticket_multi_use = 0;
      console.log("abcd", account.data.UserNonce[0].ticket_one_time_use);
      var money_total_ticket_ot = 0;
      var money_total_ticket_mul = 0;
      console.log("abcdf", money_total_ticket_mul);

      console.log("abcdfh");
      if (ticket.data.TicketTokens[0].type == 1) {
        console.log("test");
        ticket_one_time_use =
          account.data.UserNonce[0].ticket_one_time_use == null
            ? 0 + 1
            : account.data.UserNonce[0].ticket_one_time_use + 1;
        console.log("test2");
        money_total_ticket_ot =
          account.data.UserNonce[0].money_total_ticket_ot == null
            ? 0 + ticket.data.TicketTokens[0].price
            : account.data.UserNonce[0].money_total_ticket_ot +
              ticket.data.TicketTokens[0].price;
        console.log(ticket_one_time_use, money_total_ticket_ot);
      } else {
        console.log("test2");
        ticket_multi_use =
          account.data.UserNonce[0].ticket_multi_use == null
            ? 0 + 1
            : account.data.UserNonce[0].ticket_multi_use + 1;
        console.log(ticket_multi_use);
        money_total_ticket_mul =
          account.data.UserNonce[0].money_total_ticket_mul == null
            ? 0 + ticket.data.TicketTokens[0].price
            : account.data.UserNonce[0].money_total_ticket_ot +
              ticket.data.TicketTokens[0].price;
      }
      console.log("abcd");
      var ticket_sold = account.data.UserNonce[0].ticket_sold + 1;
      const update = await statistic({
        wallet_address: ticket.data.TicketTokens[0].owner_address,
        input: {
          ticket_one_time_use,
          ticket_multi_use,
          money_total_ticket_ot,
          money_total_ticket_mul,
          ticket_sold,
          total_proceeds:money_total_ticket_ot+money_total_ticket_mul
        },
      });
      console.log(update);
    }
    return res.status(200).send("test");
  } catch (err) {
    return res.status(400).send("lỗi");
  }
});
module.exports = router;
