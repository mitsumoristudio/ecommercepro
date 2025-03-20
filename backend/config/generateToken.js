
import jwt from 'jsonwebtoken';

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET_TOKEN,  {
        expiresIn: '1h'
    });

    // Set JWT as an HTTP-Only Cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // Use secure cookies in production
        sameSite: 'strict', // Prevents CSSF attacks
        maxAge: 60 * 60 * 1000, // 1hr in milliseconds
    })
};

