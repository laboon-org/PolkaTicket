var Router = require("router");
const create_qr = require("./create_qr_code")
var router = Router();
var btoas = require('btoa');
const QRCode = require('qrcode');

router.post("/create", async (req: any, res: any) => {
  const {ticket_id}= req.body.input 
  try {
    let img = "";
    const segs = btoas(ticket_id);
    let qr = await QRCode.toDataURL(segs);
    const data = create_qr({id:ticket_id,qrcode:qr})
    return res.json({
      data:{
        qrcode: qr
      }
    })
  
  } catch (err) {
    console.log(err);
    res.status(400).send("Không thể sinh mã qr");
  }
});
module.exports = router;
