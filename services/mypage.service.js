const mypageRepository = require("../repositories/mypage.repository");
//const redisRepository = require("../repositories/redis.repository");
const { UserInfos, Likes, Posts } = require("../models");
class MypageService {
  // redisRepository = new redisRepository();
  mypageRepository = new mypageRepository(UserInfos, Likes, Posts);

  liked_products = async (user_id, pagination) => {
    console.log(pagination);
    const { totalPages: totalPages, likedProducts: liked_products } =
      await this.mypageRepository.liked_products(user_id, pagination);
    return {
      totalPages: totalPages,
      likedProducts: liked_products,
    };
  };

  products = async (user_id, pagination) => {
    const { totalPages, product_list } = await this.mypageRepository.products(
      user_id,
      pagination
    );

    return { totalPages, product_list };
  };

  sold_products = async (user_id, pagination) => {
    const { totalPages, sold_products } =
      await this.mypageRepository.sold_products(user_id, pagination);

    return { totalPages, sold_products };
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

  // send_email = async (email) => {
  //   const send_email = await this.redisRepository.sendEmailVerificationCode(
  //     email
  //   );
  //   return send_email;
  // };

  // receive_email = async (verified_number, email) => {
  //   const recieve_email = await this.redisRepository.receive_email(
  //     verified_number,
  //     email
  //   );
  // };
  checked_product = async (post_id, user_id) => {
    const checked = await this.mypageRepository.checked_product(
      post_id,
      user_id
    );

    return checked;
  };
}
module.exports = MypageService;
