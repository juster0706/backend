router.get('/bestposts', async (req, res) => {
    try {
        const posts = await Posts.find();
        const results = await Promise.all(
            posts.map(async (item) => {
                const post = {
                    postId: item.postId,
                    userId: item.userId,
                    nickname: item.nickname,
                    title: item.title,
                    content: item.content,
                    likes: item.likes,
                    views: item.views,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    photo_url: item.photo_url,
                };
                const likeCount = await Likes.countDocuments({ postId: item.postId });
                post.likeCount = likeCount;
                return post;
            })
        );

        if (results.length === 0) {
            return res.status(412).json({ message: '아직 게시물이 존재하지 않습니다.' });
        }

        let bestPosts;
        if (results.length < 20) {
            bestPosts = results;
        } else {
            const sortedPosts = results.sort((a, b) => b.likeCount - a.likeCount);
            bestPosts = sortedPosts.slice(0, 20);
        }
        
        res.json(bestPosts);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: '게시글 조회에 실패하였습니다.' });
    }
});