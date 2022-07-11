var Router = require("router");
var router = Router();
const ipfs = require("../../ipfs/index")
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
  });
router.post("/uploadfile", upload.single("file"), async (req:any, res:any) => {
  console.log(req.body)
    const {base64} = req.body
  try {
    const data = await ipfs(base64)
    console.log(data)
    res.status(200).json(data)
  } catch (err) {
    console.log(err);
    res.status(400).send("Tài khoản đã tồn tại");
  }
});
module.exports = router;