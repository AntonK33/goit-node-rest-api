import  User  from"../models/user.js";
import ctrlWrapper  from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js"
import  request  from  "express";
import * as authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";

import gravatar from "gravatar";
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
    throw HttpError(409, "Email in use");
    }
    const subscription = req.body.subscription ?? "starter";
    const avatarURL = gravatar.url(email);
    const body = { ...req.body, subscription, avatarURL };

    const newUser = await User.create(body);
     
    res.json({
        email: newUser.email,
        name: newUser.name,
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }
    const comparePassword = await authServices.validatePassword(password, user.password);
    if (!comparePassword) {
       throw HttpError(401, "Email or password is wrong")
    }
    const { _id: id } = user;
    const payload = {id}

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await authServices.updateUser({ _id: id }, { token });

    res.json({ token });

}

const getCurrent = async (req, res) => {
const {userName, email} =  req.body;

    res.json({
        userName,
        email
    })
}

const signout = async (req, res) => {
    const { _id } = req.user;
    await authServices.updateUser({ _id }, { token: null });

    res.json({
        message: "Signout secces"
    })
}



export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}