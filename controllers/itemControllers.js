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


async function updateItem(req, res) {
  const { id } = req.params;
  const { admin_password } = req.body;

  if (admin_password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send("Unauthorized: Invalid admin password");
  }

  const item = {
    id,
    name: req.body.item_name,
    description: req.body.item_description,
    category_id: req.body.category_id,
    qty: req.body.item_qty
  };

  try {
    await db.updateItem(item);
    console.log(`Item ${id} updated`);
    res.redirect('/items');
  } catch (err) {
    console.error(`Failed to update item ${id}:`, err);
    res.status(500).send("Update failed");
  }
}

async function getEditItem(req, res) {
  const { id } = req.params;
  const item = await db.readItemById(id);
  const categoryData = await db.readCategories();

  res.render('updateItem', {
    title: "Edit Item",
    item,
    categoryData
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