const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const UserController = require("../controllers/users.controller");
const userController = new UserController();

// 회원가입 API
router.post("/signup", userController.signup);

// 닉네임 중복 확인 API
router.post("/checkNickname", userController.checkNickname);

// 회원탈퇴 API
router.delete("/withdraw", authMiddleware, userController.deleteSignup);

// 로그인 API
router.post("/login", userController.login);

// 로그아웃 API
router.delete("/logout", userController.logout);

module.exports = router;
