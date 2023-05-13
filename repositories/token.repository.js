const { Tokens } = require("../models");

class TokenRepository {
  // Tokens table에 refresh token 저장
  saveRefreshToken = async (user_id, refreshToken) => {
    const saveRefreshToken = await Tokens.create({
      token: refreshToken,
      user_id: user_id,
    });

    return saveRefreshToken;
  };
}

module.exports = TokenRepository;
