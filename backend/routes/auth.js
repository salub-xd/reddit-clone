const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Post = require('../model/Post');
const verify = require('../midleware/verify');

router.get('/fetch', verify, async (req, res) => {
    try {
        let success = false
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'Not user found' })
        }
        const { password, ...userInfo } = user._doc;
        success = true;
        console.log(success, userInfo);
        res.status(201).json({ success, userInfo });

    } catch (err) {
        res.status(404).json(err);

    }
})

router.get('/fetchAll/:id', verify, async (req, res) => {
    try {
        if (req.params.id == 123) {
            let success = false
            const user = await User.find();
            if (!user) {
                return res.status(404).json({ error: 'No users found' })
            }
            const { password, ...userInfo } = user;
            success = true;
            console.log(success, userInfo);
            res.status(201).json({ success, userInfo });
        }
    } catch (err) {
        res.status(404).json(err);
    }
})

router.get('/fetchUsers', async (req, res) => {
    try {
        let success = false
        const user = await User.find();
        if (!user) {
            return res.status(404).json({ error: 'No users found' })
        }
        let usernames = [];
        user.map((userInfo) => {
            // console.log(userInfo._doc);
            const { username, ...userInfoo } = userInfo._doc;
            usernames.push(username.trim());
            // console.log(username);
        })
        // const { username, ...userInfo } = user;
            console.log(usernames);

        // const post = await Post.find();

        success = true;
        // console.log(success, username, userInfo);
        res.status(201).json({ success,usernames});
    } catch (err) {
        res.status(404).json(err);
    }
})


router.get('/fetchDetails', verify, async (req, res) => {
    try {

        let success = false;

        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ error: "User didn't found." });
        }
        const { password, ...userInfo } = user._doc;

        const username = user._id;
        console.log(username)

        const post = await Post.find({ userId: req.user.id }).sort({ _id: -1 });;

        success = true;
        console.log(success, post);
        res.status(201).json({ success, userInfo, post });

    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
});

router.post('/register', async (req, res) => {
    try {

        let success = false;
        const checkUserUsername = await User.findOne({ username: req.body.username });
        if (checkUserUsername) {
            return res.status(403).json({ error: "Username already exits!" });
        }
        const checkUserEmail = await User.findOne({ email: req.body.email });
        if (checkUserEmail) {
            return res.status(403).json({ error: "Email already exits!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const savedUser = await user.save();
        const jwtToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "60d" });

        res.cookie('jwtToken', jwtToken, {
            httpOnly: true,
        });

        success = true;
        const { password, ...info } = user._doc;
        console.log(jwtToken, info);
        res.status(202).json({ success, jwtToken, ...info });

    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
})



router.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(403).json({ error: "Please fill correct details!" });
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password)

        if (!comparePass) {
            return res.status(403).json({ error: "Please fill correct details!" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const savedUser = await user.save();
        const jwtToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "60d" });

        res.cookie('jwtToken', jwtToken, {
            httpOnly: true,
        });

        success = true;
        const { password, ...info } = user._doc;
        console.log(jwtToken, info);
        res.status(202).json({ success, jwtToken, ...info });

    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
})

// Update
router.put('/:id', verify, async (req, res) => {
    try {
        if (req.params.id) {
            let success = false;
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
            }
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            const { password, ...user } = updateUser._doc;
            success = true;
            console.log(updateUser);
            console.log(user);
            res.status(200).json({ success, user });
        }
    } catch (err) {
        // console.log(err);
        return res.status(404).json(err);
    }
});

// Delete
router.delete('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            let success = false;
            await User.findByIdAndDelete(req.params.id);
            success = true;
            res.status(200).json({ success, info: 'Your Account has been Deleted Successfully' });

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)

        }
    } else {
        return res.status(500).json({ Error: "You can Delete your account only" });
    }
})

module.exports = router;