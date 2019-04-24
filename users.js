import express from "express";
import User from "../../models/User";
import {validateRegisterInput} from "../../validation/register";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import {validateLoginInput} from "../../validation/login";
import checkAuth from "../../middleware/check-auth";
import passport from "passport/lib";

require('dotenv').config();

const userRouter= express.Router();

// @route GET /api/users/test
// @desc Test user route
// @ access private
userRouter.post('/test',(req,res,next)=>{
    console.log(mongoose.Types.ObjectId.fromString(req.body.id));
    console.log(mongoose.Types.ObjectId.isValid(req.body.id));
    res.status(200).json({message:'Working'});

});

// @route POST /api/user/register
// @desc register the user
// @ access Public
userRouter.post('/register',(req,res,next)=>{
    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const {email,password,name}=req.body;

    User.findOne({email})
        .exec()
        .then(user=>{
            if(user){
               res.status(409).json({message:'User with this email already exists'});

            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.hash(password,10)
                    .then(hash=>{
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user=>res.status(201).json(user))
                            .catch(error=>res.status(500).json(error));
                    });

            }
        })
        .catch(err=>res.status(500).json(err))

});

// @route POST /api/user/login
// @desc login the user
// @ access Public

userRouter.post('/login', (req,res) => {

    const { errors, isValid } = validateLoginInput(req.body);


    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({

        email
    })
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };
                        jwt.sign(
                            payload,
                            'secret',
                            {expiresIn: 1800},
                            (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @route DELETE /api/user/:userId
// @desc delete the user with provided user Id
// @ access private TODO make it private
userRouter.delete('/:userId',(req,res,next)=>{
    User.findOneAndDelete({_id:req.params.userId})
        .exec()
        .then(()=>res.status(200).json({message:'User deleted'}))
        .catch(err=>res.status(500).json(err))
});

userRouter.get('/current',passport.authenticate('jwt', {session: false}),(req,res,next)=>{
   return res.status(200).json(req.userData)
});


export default userRouter;


