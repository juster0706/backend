const { Op } = require("sequelize");

class MypageRepository {
  constructor(UserInfos, Likes, Posts) {
    this.UserInfos = UserInfos;
    this.Likes = Likes;
    this.Posts = Posts;
  }

  liked_products = async (user_id, pagination) => {
    const totalCount = await this.Likes.count({ where: { user_id: user_id } });
    const totalPages = Math.ceil(totalCount / pagination.limit);

    const liked_products = await this.Likes.findAll({
      limit: pagination.limit, //보여줄것들!!!
      offset: pagination.offset,
      include: [
        {
          model: this.Posts,
          attributes: [
            "post_id",
            "title",
            "content",
            "price",
            "photo_url",
            "location",
            "current_status",
          ],
        },
      ],
      where: { user_id: user_id },
      attributes: [],
      order: [[this.Posts, "createdAt"]],
    });
    return {
      totalPages: totalPages,
      likedProducts: liked_products,
    };
  };
  //판매중
  products = async (user_id, pagination) => {
    const totalCount = await this.Posts.count({
      where: { [Op.and]: [{ current_status: false }, { user_id: user_id }] },
    });
    const totalPages = Math.ceil(totalCount / pagination.limit);
    console.log(totalCount);
    const product_list = await this.Posts.findAll({
      limit: pagination.limit,
      offset: pagination.offset,
      attributes: [
        "post_id",
        "title",
        "content",
        "price",
        "photo_url",
        "location",
        "current_status",
      ],
      where: {
        [Op.and]: [{ current_status: false }, { user_id: user_id }],
      },
    });

    return { totalPages, product_list };
  };
  //거래완료
  sold_products = async (user_id, pagination) => {
    const { count, rows: sold_products } = await this.Posts.findAndCountAll({
      limit: pagination.limit,
      offset: pagination.offset,
      attributes: [
        "post_id",
        "title",
        "content",
        "price",
        "photo_url",
        "location",
        "current_status",
      ],
      where: {
        [Op.and]: [{ current_status: true }, { user_id: user_id }],
      },
    });

    const totalPages = Math.ceil(count / pagination.limit);

    return { totalPages, sold_products };
  };

  updated_info = async (
    email,
    location,
    profile_image,
    introduction,
    user_id
  ) => {
    return await this.UserInfos.update(
      {
        email,
        location,
        profile_image,
        introduction,
      },
      {
        where: { user_id: user_id },
      }
    );
  };

  checked_product = async (post_id, user_id) => {
    return await this.Posts.update(
      {
        current_status: true,
      },
      {
        where: { [Op.and]: [{ post_id: post_id }, { user_id: user_id }] },
      }
    );
  };
}
module.exports = MypageRepository;
