const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const page_middle = require("../middlewares/pagination-middleware");
const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();
//index router => api/auth/profile
router.get(
  "/likedProducts",
  authMiddleware,
  page_middle,
  mypageController.liked_products
);

router.get("/products", authMiddleware, page_middle, mypageController.products);

router.get(
  "/soldProducts",
  authMiddleware,
  page_middle,
  mypageController.sold_products
);

router.put("/:post_id", authMiddleware, mypageController.checked_product);

router.put("/", authMiddleware, mypageController.updated_info);

//router.post("/sendEmail", authMiddleware, mypageController.send_email);
//router.post("/receiveEmail", authMiddleware, mypageController.recieve_email);

module.exports = router;
