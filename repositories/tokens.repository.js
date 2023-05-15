const { Tokens } = require("../models");

class TokenRepository {
  // Tokens table에 refresh token 저장
  saveToken = async (user_id, refreshToken) => {
    const saveToken = await Tokens.create({
      token: refreshToken,
      user_id: user_id,
    });

    return saveToken;
  };

  // 새로운 Access Token 발급받을때 Refresh Token으로 user_id 가져오기
  findTokenId = async (authRefreshToken) => {
    const accessTokenId = await Tokens.findOne({
      where: { token: authRefreshToken },
    });
    const { user_id } = accessTokenId;

    return user_id;
  };

  deleteToken = async (user_id) => {
    await Tokens.destroy({ where: { user_id } });
    return;
  };
}

module.exports = TokenRepository;
