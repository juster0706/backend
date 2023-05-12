const UserRepository = require("../repositories/users.repository");

class UserService {
  userRepository = new UserRepository();

  // 중복되는 닉네임 찾기
  existNickname = async (nickname) => {
    const existNickname = await this.userRepository.findNickname(nickname);
    return existNickname;
  };

  // 중복되는 이메일 찾기
  existEmail = async (email) => {
    const existEmail = await this.userRepository.findEmail(email);
    return existEmail;
  };

  // 회원가입
  signup = async (
    nickname,
    password,
    email,
    location,
    profile_image,
    introduction
  ) => {
    const signupData = await this.UserRepository.signup(
      nickname,
      password,
      email,
      location,
      profile_image,
      introduction
    );
    return signupData;
  };
}

module.exports = UserService;
