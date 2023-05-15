const mypageRepository = require("../repositories/mypage.repository");
const redisRepository = require("../repositories/redis.repository");
const { UserInfos, Likes, Posts } = require("../models");
class MypageService {
  redisRepository = new redisRepository();
  mypageRepository = new mypageRepository(UserInfos, Likes, Posts);

  liked_products = async (user_id, pagination) => {
    console.log(pagination);
    const likedProducts = await this.mypageRepository.liked_products(
      user_id,
      pagination
    );
    return likedProducts;
  };

  products = async (user_id, pagination) => {
    const products = await this.mypageRepository.products(user_id, pagination);

    return products;
  };

  sold_products = async (user_id, pagination) => {
    const sold_products = await this.mypageRepository.sold_products(
      user_id,
      pagination
    );

    return sold_products;
  };

  updated_info = async (
    email,
    location,
    profile_image,
    introduction,
    user_id
  ) => {
    await this.mypageRepository.updated_info(
      email,
      location,
      profile_image,
      introduction,
      user_id
    );
  };

  send_email = async (email) => {
    const send_email = await this.redisRepository.sendEmailVerificationCode(
      email
    );
    return send_email;
  };

  receive_email = async (verified_number, email) => {
    const recieve_email = await this.redisRepository.receive_email(
      verified_number,
      email
    );
  };
}
module.exports = MypageService;
