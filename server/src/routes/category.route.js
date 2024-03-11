const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.get('/', categoryController.getCategoryList);
router.get('/:categoryId', categoryController.getCategoryById);
router.post('/', categoryController.categoryNew);
router.put('/', categoryController.categoryUpdate);
router.delete('/:categoryId', categoryController.deleteCategoryById);

module.exports = router
