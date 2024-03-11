const CategoryModel = require('../models/category.model');

module.exports = {
    getCategoryList: async (req, res) => {
        try {
            let {limit, page} = (req.query);
            const offset = (page - 1) * limit;
            const categoryList = await CategoryModel.getCategoryList(limit, offset);
            let categoryTotal = await CategoryModel.getCategoryTotal();
            categoryTotal = categoryTotal[0]['count'];
            const totalPage = Math.ceil(categoryTotal / limit);
            res.json({
                data: categoryList,
                pagination: {
                    limit: +limit,
                    page: +page,
                    totalPage: +totalPage,
                    totalData: +categoryTotal
                }
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getCategoryById: async (req, res) => {
        const categoryId = req.params.categoryId;
        try {
            const categoryDetail = await CategoryModel.getCategoryById(categoryId);
            res.json({
                data: categoryDetail,
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    categoryNew: async (req, res) => {
        const {
            name,
            description
        } = req.body;
        try {
            const results = await CategoryModel.categoryNew(
                name,
                description
            );
            res.json({
                success: true,
                data: {
                    message: 'Add data success',
                },
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    categoryUpdate: async (req, res) => {
        const {
            id,
            name,
            description
        } = req.body;
        try {
            await CategoryModel.categoryUpdate(
                id,
                name,
                description
            );
            res.json({
                success: true,
                data: {
                    message: 'Update data success',
                },
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    deleteCategoryById: async (req, res) => {
        const {categoryId} = req.params;
        try {
            await CategoryModel.deleteCategoryById(categoryId);
            res.json({
                success: true,
                data: {
                    message: 'Delete data success',
                },
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
}
