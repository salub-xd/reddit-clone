const router = require('express').Router();
const Post = require('../model/Post');
const User = require('../model/User');
const verify = require('../midleware/verify');

router.get('/fetch', verify, async (req, res) => {
    try {
        let success = false
        const post = await Post.find({ userId: req.user.id }).sort({ _id: -1 });
        if (!post) {
            return res.status(404).json({ error: 'Not posts found' })
        }
        success = true;
        res.status(201).json({ success, post });

    } catch (err) {
        res.status(404).json(err);

    }
})

router.get('/fetchAll', async (req, res) => {

    try {

        const post = await Post.find();
        success = true;
        res.status(201).json({ success, post });

    } catch (err) {
        res.status(405).json(err);

    }
})

router.get('/fetchAllDetails', verify, async (req, res) => {
    try {

        let success = false;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User didn't found." });
        }
        const { password, ...userInfo } = user._doc;

        const username = user._id;
        console.log(username)

        const post = await Post.find();;

        success = true;
        console.log(success, post);
        res.status(201).json({ success, userInfo, post });

    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
});

router.post('/add', verify, async (req, res) => {
    try {

        let success = false;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User didn't found." });
        }

        // console.log(user)
        const username = user.username;
        // console.log(username)

        // console.log({ user: req.user.id });
        const post = new Post({
            username: username,
            userId: req.user.id,
            title: req.body.title,
            description: req.body.description,
        });

        const savedPost = await post.save();

        success = true;
        console.log(success, post);
        res.status(201).json({ success, post });

    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
});

// Update
router.put('/:id', verify, async (req, res) => {
    try {
        console.log(req.params.id)
        if (req.params.id) {
            console.log(req.params.id)

            let success = false;
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: "There is no post" });
            }

            if (req.user.id !== post.userId.toString()) {
                return res.status(404).json({ error: "Who posted it only that person can edit this" });
            }

            const postUser = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            success = true;
            console.log(success, postUser);
            res.status(201).json({ success, postUser });
        }
    } catch (err) {
        // console.log(err);
        return res.status(404).json(err);
    }
});

// likes Update
router.post('/likes/:id', verify, async (req, res) => {
    try {
        if (req.params.id) {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: "There is no post" });
            }

            const likes = post.likes;
            // console.log(likes);

            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNmJiNjJiMGU2OTZkZjhiYzZmYmVkIn0sImlhdCI6MTY5NTk4ODU3OCwiZXhwIjoxNzAxMTcyNTc4fQ.9whTe_Zwy18R0Z1BS2hZmol0DDg9zM8svanXq7HMyxo

            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiY2Y1ZmIxYjAxZGMzYzYzNjVhYjczIn0sImlhdCI6MTY5NTk4ODY1OSwiZXhwIjoxNzAxMTcyNjU5fQ.AP-g0uSXhBYlBPTjEOwd0s_0ryuf7rSEsNXybILNmxQ

            //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNmMwMmQxYWZlYzAwNTg4ZTM2OGMxIn0sImlhdCI6MTY5NTk4OTgwNSwiZXhwIjoxNzAxMTczODA1fQ.2bOFzi-ISDoSYleadgP5e2niXNRLeJuacqhCoscPKVg

            if (likes?.includes(req.user.id)) {
                console.log('disliker');
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user.id } }, { new: true });
                return res.status(200).json({ updatedPost, likes: likes.length - 1 });
            } else if (!likes?.includes(req.user.id)) {
                console.log('liker');
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user.id } }, { new: true });
                console.log(updatedPost);
                return res.status(201).json({ updatedPost, likes: likes?.length + 1 });
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
});

// Delete
router.delete('/:id', verify, async (req, res) => {
    try {
        if (req.params.id) {
            let success = false;
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: "There is no post" });
            }

            if (req.user.id !== post.userId.toString()) {
                return res.status(404).json({ error: "The user posted it only that user can edit this" });
            }

            success = true;
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json({ success, info: 'Your Post has been Deleted Successfully' });

        }
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
})

module.exports = router;