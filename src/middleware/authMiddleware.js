import cookieParser from 'cookie-parser';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const createAuthMiddleware = () => {
  return async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token)
        return res.status(401).json({ error: 'no token' });

    const { payload } = await jwtVerify(token, secret, {"algorithms": ['HS256']});

    console.log("The contents of the payload within the cookies arE: " + payload);

    req.tokenInfo = payload;
    next();
  };
};