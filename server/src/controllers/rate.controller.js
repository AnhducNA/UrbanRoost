const RateModel = require("../models/rate.model");
const formatDate = (date) =>  {
    return (date) ? date.toLocaleDateString("vn-VN") : date
}

module.exports = {
    getRateList: async (req, res) => {
        try {
            let {limit, page} = (req.query);
            const offset = (page - 1) * limit;
            const rateList = await RateModel.getRateList(limit, offset);
            const totalRate = rateList.length;
            const totalPage = Math.ceil(totalRate / limit);
            rateList.forEach((rate) => {
                rate.created_at = formatDate(rate.created_at)
                rate.updated_at = formatDate(rate.updated_at)
            });
            res.json({
                data: rateList,
                pagination: {
                    limit: +limit,
                    page: +page,
                    totalPage: +totalPage,
                    totalData: +totalRate
                }
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getRateById: async (req, res) => {
        const rateId = req.params.rateId;
        try {
            const rateDetail = await RateModel.getRateById(rateId);
            rateDetail.forEach((user) => {
                user.created_at = formatDate(user.created_at)
                user.updated_at = formatDate(user.updated_at)
            })
            res.json({
                data: rateDetail
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
}
