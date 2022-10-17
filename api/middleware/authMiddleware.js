

//check user login or not with token

import createError from "../controllers/errorHandlerController.js";

import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) =>{

    const token = req.cookies.access_token;


    // check token 

    if(!token){
        next(createError(401, "you are not authenticate"))
    }
    // verify token check 

    const token_verify = jwt.verify(token, process.env.TOKEN_SECRET)

    if(!token_verify){
        next(createError(401, "Invalid Token"))
    }

    //if token match

    if(token_verify){
        req.user = token_verify;
        next()
    }
}
