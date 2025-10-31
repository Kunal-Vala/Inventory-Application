const db = require('../db/queries');
require('dotenv').config(); // Ensure .env is loaded

async function getItem(req, res) {
  try {
    const data = await db.readAllItems();
    res.render('items', {
      title: "Inventory Details",
      itemList: data
    });
  } catch (err) {
    console.error('Error in getItem:', err);
    res.status(500).send('Failed to fetch inventory items');
  }
}

async function getAllCategories(req, res) {
  try {
    const categoryData = await db.readCategories();
    res.render('category', {
      title: "Category List",
      categoryList: categoryData,
    });
  } catch (err) {
    console.error('Error in getAllCategories:', err);
    res.status(500).send('Failed to fetch categories');
  }
}

async function postNewItem(req, res) {
  try {
    const { item_name, item_description, category_id, item_qty, item_price } = req.body;
    
    await db.insertItem({
      name: item_name,
      description: item_description,
      category_id,
      qty: item_qty,
      price: item_price
    });
    
    res.redirect('/items');
  } catch (err) {
    console.error('Error in postNewItem:', err);
    res.status(500).send('Failed to create new item');
  }
}

async function getNewItem(req, res) {
  try {
    const categoryData = await db.readCategories();
    res.render('insertItem', {
      categoryData
    });
  } catch (err) {
    console.error('Error in getNewItem:', err);
    res.status(500).send('Failed to load new item form');
  }
}

function getNewCategory(req, res) {
  try {
    res.render('insertCategory');
  } catch (err) {
    console.error('Error in getNewCategory:', err);
    res.status(500).send('Failed to load new category form');
  }
}

async function postNewCategory(req, res) {
  try {
    const { category } = req.body;
    await db.insertCategory(category);
    res.redirect('/items/insert');
  } catch (err) {
    console.error('Error in postNewCategory:', err);
    res.status(500).send('Failed to create new category');
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const { admin_password } = req.body;

    if (admin_password !== process.env.ADMIN_PASSWORD) {
      console.error(`Unauthorized update attempt for item ${id}`);
      return res.status(403).send("Unauthorized: Invalid admin password");
    }

    const item = {
      id,
      name: req.body.item_name,
      description: req.body.item_description,
      category_id: req.body.category_id,
      qty: req.body.item_qty,
      price: req.body.item_price
    };

    await db.updateItem(item);
    console.log(`Item ${id} updated successfully`);
    res.redirect('/items');
  } catch (err) {
    console.error(`Error in updateItem for id ${req.params.id}:`, err);
    res.status(500).send("Update failed");
  }
}

async function getEditItem(req, res) {
  try {
    const { id } = req.params;
    const item = await db.readItemById(id);
    const categoryData = await db.readCategories();

    if (!item) {
      console.error(`Item not found with id: ${id}`);
      return res.status(404).send('Item not found');
    }

    res.render('updateItem', {
      title: "Edit Item",
      item,
      categoryData
    });
  } catch (err) {
    console.error(`Error in getEditItem for id ${req.params.id}:`, err);
    res.status(500).send('Failed to load edit form');
  }
}

async function deleteItemById(req, res) {
  try {
    const { id } = req.params;
    const { admin_password } = req.body;

    if (admin_password !== process.env.ADMIN_PASSWORD) {
      console.error(`Unauthorized delete attempt for item ${id}`);
      return res.status(403).send("Unauthorized: Invalid admin password");
    }

    await db.deleteItem(id);
    console.log(`Item ${id} deleted successfully`);
    res.redirect('/items');
  } catch (err) {
    console.error(`Error in deleteItemById for id ${req.params.id}:`, err);
    res.status(500).send('Failed to delete item');
  }
}

async function deleteCategoryById(req, res) {
  try {
    const { id } = req.params;
    const { admin_password } = req.body;

    if (admin_password !== process.env.ADMIN_PASSWORD) {
      console.error(`Unauthorized delete attempt for category ${id}`);
      return res.status(403).send("Unauthorized: Invalid admin password");
    }

    await db.deleteCategory(id);
    console.log(`Category ${id} deleted successfully`);
    res.redirect('/category');
  } catch (err) {
    console.error(`Error in deleteCategoryById for id ${req.params.id}:`, err);
    res.status(500).send('Failed to delete category');
  }
}

function getIndexPage(req, res) {
  try {
    res.render('index');
  } catch (err) {
    console.error('Error in getIndexPage:', err);
    res.status(500).send('Failed to load index page');
  }
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
  deleteCategoryById,
  getIndexPage
};