const MypageService = require("../services/mypage.service");

const { update_info_schema } = require("./joi");
class MyPage {
  mypageService = new MypageService();

  liked_products = async (req, res) => {
    // const { user_id } = res.locals.user;
    const user_id = 1;
    try {
      const liked_products = await this.mypageService.liked_products(
        user_id,
        req.pagination
      );

      return res.status(200).json({ liked_products });
    } catch (e) {
      //throw new Error(`412/${error}`);
    }
  };

  products = async (req, res) => {
    const { user_id } = res.locals.user;

    try {
      const products = await this.mypageService.products(
        user_id,
        req.pagination
      );
      return res.status(200).json({ products });
    } catch (e) {}
  };

  sold_products = async (req, res) => {
    // const { user_id } = req.locals.user;
    const user_id = "hawook";
    try {
      const sold_products = await this.mypageService.sold_products(
        user_id,
        req.pagination
      );

      return res.status(200).json({ sold_products });
    } catch (e) {}
  };
  updated_info = async (req, res, next) => {
    //const { user_id } = res.locals.users;
    const user_id = "hawook";
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
      return res.json({ message: e.message });
    }
  };

  send_email = async (req, res) => {
    const { email } = req.body;
    try {
      const send_email = await this.mypageService.send_email(email);
      return res.status(200).json({ message: "success" });
    } catch (e) {}
  };
  ///이메일 인증
  recieve_email = async (req, res) => {
    const { verified_number, email } = req.body;
    try {
      const receive_email = await this.mypageService.receive_email(
        verified_number,
        email
      );
      return res.status(200).json({ message: "success" });
    } catch (e) {}
  };

  checked_product = async (req, res) => {
    const { post_id } = req.params;
    const { user_id } = req.locals.user;
    try {
      const checked_product = await this.mypageService.checked_product(
        post_id,
        user_id
      );
      return res.status(200).json({ message: "거래를 완료하셨습니다" });
    } catch (e) {}
  };
}
module.exports = MyPage;
