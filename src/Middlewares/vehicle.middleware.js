// vehicleMiddleware.js
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const fillUserData = (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (!err) {
                req.user = user;
            }
            next();
        });
    } else {
        next();
    }
};
