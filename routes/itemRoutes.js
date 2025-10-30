const { Router } = require('express')
const itemRouter = Router()
const itemController = require('../controllers/itemControllers')


itemRouter.get("/items",itemController.getItem)
itemRouter.get("/category",itemController.getAllCategories)
itemRouter.get('/items/insert',itemController.getNewItem)
itemRouter.post('/items/insert',itemController.postNewItem)
itemRouter.get('/category/insert',itemController.getNewCategory)
itemRouter.post('/category/insert',itemController.postNewCategory)
// itemRouter.get('/items/:id',itemController.getItemById)
itemRouter.get('/items/:id/edit', itemController.getEditItem);
itemRouter.patch('/items/:id', itemController.updateItem);
itemRouter.delete('/items/:id',itemController.deleteItemById)
itemRouter.delete('/category/:id',itemController.deleteCategoryById)

module.exports = itemRouter
