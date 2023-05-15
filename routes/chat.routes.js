const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile("./static/index.html", (err, data) => {
    if (err) {
      res.send("오류났음");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

module.exports = router;
