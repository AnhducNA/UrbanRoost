const UserModel = require("../models/user.model");
const formatDate = (date) =>  {
    return (date) ? date.toLocaleDateString("vn-VN") : date
}

module.exports = {
    getUserList: async (req, res) => {
        try {
            let {limit, page} = (req.query);
            const offset = (page - 1) * limit;
            const userList = await UserModel.getUserList(limit, offset);
            const totalUser = userList.length;
            const totalPage = Math.ceil(totalUser / limit);
            userList.forEach((user) => {
                user.created_at = formatDate(user.created_at)
                user.updated_at = formatDate(user.updated_at)
            });
            res.json({
                data: userList,
                pagination: {
                    limit: +limit,
                    page: +page,
                    totalPage: +totalPage,
                    totalData: +totalUser
                }
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getUserById: async (req, res) => {
        const userId = req.params.userId;
        try {
            const userDetail = await UserModel.getUserById(userId);
            userDetail.forEach((user) => {
                user.created_at = formatDate(user.created_at)
                user.updated_at = formatDate(user.updated_at)
            })
            res.json({
                data: userDetail
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getBookingByUserId: async (req, res) => {
        const userId = req.params.userId;
        try {
            const bookingList = await UserModel.getBookingByUserId(userId);
            bookingList.forEach((booking) => {
                booking.time_in = formatDate(booking.time_in)
                booking.time_out = formatDate(booking.time_out)
            })
            res.json({
                data: bookingList
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getPlaceByUserId: async (req, res) => {
        const userId = req.params.userId;
        try {
            const placeList = await UserModel.getPlaceByUserId(userId);
            placeList.forEach((booking) => {
                booking.created_at = formatDate(booking.created_at)
                booking.updated_at = formatDate(booking.updated_at)
            })
            res.json({
                data: placeList
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getRateByUserId: async (req, res) => {
        const userId = req.params.userId;
        try {
            const rateList = await UserModel.getRateByUserId(userId);
            rateList.forEach((rate) => {
                rate.created_at = formatDate(rate.created_at)
                rate.updated_at = formatDate(rate.updated_at)
            })
            res.json({
                data: rateList
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
}
