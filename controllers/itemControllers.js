const db = require('../db/queries');
require('dotenv').config(); // Ensure .env is loaded

async function getItem(req, res) {
  const data = await db.readAllItems();
  res.render('items', {
    title: "Inventory Details",
    itemList: data
  });
}

async function getAllCategories(req, res) {
  const categoryData = await db.readCategories();
  res.render('category', {
    title: "Category List",
    categoryList: categoryData,
  });
}

async function postNewItem(req, res) {
  const { item_name, item_description, category_id, item_qty } = req.body;

  await db.insertItem({
    name: item_name,
    description: item_description,
    category_id,
    qty: item_qty
  });

  res.redirect('/items');
}

async function getNewItem(req, res) {
  const categoryData = await db.readCategories();
  res.render('insertItem', {
    categoryData
  });
}


function getNewCategory(req, res) {
  res.render('insertCategory');
}

async function postNewCategory(req, res) {
  const { category } = req.body;
  await db.insertCategory(category);
  res.redirect('/items/insert');
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