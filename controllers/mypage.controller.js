const MypageService = require("../services/mypage.service");

const { update_info_schema } = require("./joi");
class MyPage {
  mypageService = new MypageService();

  liked_products = async (req, res) => {
    const { user_id } = res.locals.user;

    try {
      const { totalPages: totalPages, likedProducts: liked_products } =
        await this.mypageService.liked_products(user_id, req.pagination);

      return res.status(200).json({
        totalPages: totalPages,
        likedProducts: liked_products,
      });
    } catch (e) {
      res.status(400).json({
        errorMessage: "마이페이지 좋아요조회에 오류가 발생하였습니다.",
      });
    }
  };

  products = async (req, res) => {
    const { user_id } = res.locals.user;

    try {
      const { totalPages, product_list } = await this.mypageService.products(
        user_id,
        req.pagination
      );
      return res.status(200).json({ totalPages, product_list });
    } catch (e) {
      res.status(400).json({
        errorMessage: "마이페이지 판매중조회에 오류가 발생하였습니다.",
      });
    }
  };

  sold_products = async (req, res) => {
    const { user_id } = res.locals.user;

    try {
      const { totalPages, sold_products } =
        await this.mypageService.sold_products(user_id, req.pagination);

      return res.status(200).json({ totalPages, sold_products });
    } catch (e) {
      res.status(400).json({
        errorMessage: "마이페이지 거래완료 조회에 오류가 발생하였습니다.",
      });
    }
  };

  updated_info = async (req, res, next) => {
    const { user_id } = res.locals.users;

    try {
      const { email, location, profile_image, introduction } =
        await update_info_schema.validateAsync(req.body);

      await this.mypageService.updated_info(
        email,
        location,
        profile_image,
        introduction,
        user_id
      );
      return res.status(200).end();
    } catch (e) {
      return e.isJoi
        ? res.status(412).json({ errorMessage: e.message })
        : res.status(400).json({
            errorMessage: "마이페이지 좋아요조회에 오류가 발생하였습니다.",
          });
    }
  };

  checked_product = async (req, res) => {
    const { post_id } = req.params;
    const { user_id } = res.locals.user;
    try {
      await this.mypageService.checked_product(post_id, user_id);
      return res.status(200).json({ message: "거래를 완료하셨습니다" });
    } catch (e) {
      res.status(400).json({
        errorMessage: "거래완료에 실패하였습니다.",
      });
    }
  };

  // send_email = async (req, res) => {
  //   const { email } = req.body;
  //   try {
  //     const send_email = await this.mypageService.send_email(email);
  //     return res.status(200).json({ message: "success" });
  //   } catch (e) {}
  // };
  ///이메일 인증
  // recieve_email = async (req, res) => {
  //   const { verified_number, email } = req.body;
  //   try {
  //     const receive_email = await this.mypageService.receive_email(
  //       verified_number,
  //       email
  //     );
  //     return res.status(200).json({ message: "success" });
  //   } catch (e) {}
  // };
}
module.exports = MyPage;
