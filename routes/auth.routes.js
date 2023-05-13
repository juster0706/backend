const express = require("express");

const router = exress.Router();

const UserController = require("../controllers/users.controller");
const userController = new UserController();


// 회원가입 API
router.post("/signup", userController.singup);

// 로그인 API
// router.post('/login', usersController.login)

module.exports = router;
