const db = require('../db/queries');
require('dotenv').config(); // Ensure .env is loaded

async function getItem(req, res) {
  const data = await db.readAllItems();
  res.render('items', {
    title: "Inventory Details",
    itemList: data
  });
}



module.exports = {
  getItem,
  getAllCategories,
  postNewItem,
  getNewItem,
  getNewCategory,
  postNewCategory,
  updateItem,
  getEditItem,
  deleteItemById,
  deleteCategoryById
};