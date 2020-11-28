const { User, validate } = require('../models/user');
const { User_Roles } = require('../models/user_roles');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        let userCount = await User.countDocuments({});
        //console.log(userCount);
        //Make the first reqistered user as 'admin'
        if(userCount == 0) {
            role = new User_Roles({
                email: req.body.email,
                role: 'admin'
            });
            await role.save();
        } 
        //Else assign user role as 'user'
        else {
            role = new User_Roles({
                email: req.body.email,
                role: 'user'
            });
            await role.save();
        }
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
    
});
 
module.exports = router;