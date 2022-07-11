var Router = require("router");
var router = Router();
const sum_ticket_event = require("./sum_ticket_event")
router.post("/event", async (req: any, res: any) => {
  try {
    const ticketsold= await sum_ticket_event({
        event_id:16,
        user_id:3,
        type:1,
        status:2
    })
    const ticketbuy= await sum_ticket_event({
        event_id:4,
        user_id:3,
        type:2,
        status:1
    })
    console.log(ticketsold.data.Transaction_aggregate.aggregate.count)
    return res.status(200).json({
        ticketsold:ticketsold.data.Transaction_aggregate.aggregate.count,
        ticketbuy:ticketbuy.data.Transaction_aggregate.aggregate.count,

    }) 
  } catch (err) {
    console.log(err)
  }
});
module.exports = router;