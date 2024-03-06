const BookingModel = require("../models/booking.model");
const formatDate = (date) =>  {
    return date.toLocaleDateString("vn-VN")
}

module.exports = {
    getBookings: async (req, res) => {
        try {
            let {limit, page} = (req.query);
            const offset = (page - 1) * limit;
            const bookingList = await BookingModel.getBookings(limit, offset);
            const totalBooking = bookingList.length;
            const totalPage = Math.ceil(totalBooking / limit);
            bookingList.forEach((booking) => {
                booking.time_in = formatDate(booking.time_in)
                booking.time_out = formatDate(booking.time_out)
            })
            res.json({
                data: bookingList,
                pagination: {
                    limit: +limit,
                    page: +page,
                    totalPage: +totalPage,
                    totalData: +totalBooking
                }
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getBookingById: async (req, res) => {
        const idBooking = req.params.idBooking;
        try {
            const bookingDetail = await BookingModel.getBookingById(idBooking);
            bookingDetail.forEach((booking) => {
                booking.time_in = formatDate(booking.time_in)
                booking.time_out = formatDate(booking.time_out)
            })
            res.json({
                data: bookingDetail
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
}
