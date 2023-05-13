const UserService = require("../services/users.service");

class UserController {
  usersService = new UserService();

  // 회원가입 API
  signup = async (req, res, next) => {
    const { nickname, password, email, location, profile_image, introduction } =
      req.body;
    try {
      const nicknameFilter = /^[a-zA-Z0-9]{6,}/gi;
      const passwordFilter = /[a-zA-Z0-9]{8,}/gi;
      const emailFilter = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/gi;
      const existNickname = await this.usersService.findNicname(nickname);
      const existEmail = await this.usersService.findOneEmail(email);

      // 닉네임 길이 6 이상, 영어 대소문자만, 숫자0-9만 가능
      if (nicknameFilter.test(nickname)) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
      }

      // 이메일 형식이 비정상적인 경우
      if (emailFilter.test(email)) {
        return res
          .status(412)
          .json({ errorMessage: "이메일의 형식이 일치하지 않습니다." });
      }

      // password 길이 8이상, 영어대소문자만, 숫자0-9만 가능
      if (passwordFilter.test(password)) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드 형식이 일치하지 않습니다." });
      }
      // password에 닉네임이 포함되어있는 경우
      if (password.includes(nickname)) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드에 닉네임이 포함되어 있습니다." });
      }
      // 닉네임이 중복된 경우
      if (existNickname) {
        return res.status(412).json({ errorMessage: "중복된 닉네임입니다." });
      }
      // 이메일이 중복된 경우
      if (existEmail) {
        return res.status(412).json({ errorMessage: "중복된 이메일입니다." });
      }

      // location이 존재하지 않거나 비정상적인 경우
      if (!location || typeof location !== "string") {
        return res.status(412).json({
          errorMessage: "location이 존재하지 않거나 형식이 일치하지 않습니다.",
        });
      }

      // 회원가입 성공
      await this.usersService.signup(
        nickname,
        password,
        email,
        location,
        profile_image,
        introduction
      );
      res.status(200).json({ message: "회원 가입에 성공하였습니다." });
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      console.error(error);
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
  };
}

module.exports = UserController;
