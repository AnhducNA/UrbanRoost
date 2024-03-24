const AuthModel = require('../models/auth.model');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    authLogin: async (req, res, next) => {
        const {email, password} = req.body;
        try {
            const results = await AuthModel.getUserByEmailAndPassword(email, password);
            const user = results[0];
            if (!user) {
                res.json({
                    success: false,
                    message: 'Đăng nhập thất bại'
                });
                return;
            } else if (user?.id) {
                const token = jsonwebtoken.sign(
                    {
                        userId: user.id,
                        userEmail: user.email
                    },
                    process.env.TOKEN_SECRET,
                    {expiresIn: '24h'}
                )
                res.json({
                    success: true,
                    message: 'Đăng nhập thành công',
                    accessToken: token,
                    accessUser: user.id
                });
                return;
            }
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    authRegister: async (req, res) => {
        const {
            name, email, phone, password
        } = req.body;
        try {
            const userByEmail = await AuthModel.getUserByEmail(email);
            if (userByEmail.length > 0) {
                return res.json({
                    success: false,
                    message: 'Email đã được sử dụng',
                })
            } else {
                const results = await AuthModel.newUser(
                    name, email, phone, password
                );
                return res.json({
                    success: true,
                    message: 'Đăng ký thành công',
                });
            }
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    authForgotPassword: async (req, res) => {
        const {
            email
        } = req.body;
        try {
            const userByEmail = await AuthModel.getUserByEmail(email);
            console.log(userByEmail)
            if (userByEmail.length === 0) {
                return res.json({
                    success: false,
                    message: 'Email chưa được đăng ký',
                })
            } else {
                return res.json({
                    success: true,
                    message: 'Xác thực mật khẩu thành công',
                })
            }
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

}
