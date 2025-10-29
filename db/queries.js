const pool = require('./pool')

async function readAllItems() {
  const { rows } = await pool.query(`SELECT 
  item.id AS item_id,
  item.name AS item_name,
  item.description,
  item.qty,
  category.id AS category_id,
  category.name AS category_name
FROM item
JOIN category ON item.category_id = category.id;
`)
  return rows
}

async function insertItem(item) {
  const query = `
    INSERT INTO item (name, description, category_id, qty)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [item.name, item.description, item.category_id, item.qty];

  try {
    await pool.query(query, values);
    console.log('Item inserted successfully');
  } catch (err) {
    console.error('INSERTION FAILED:', err);
  }
}


async function readCategories() {
  const query = 'SELECT * FROM category'
  const { rows } = await pool.query(query)

  return rows
}


async function readItemById(id) {
  const result = await pool.query("SELECT * FROM item WHERE id = ($1)", [id])

  return result.rows[0]
}

module.exports = {
  readAllItems,
  insertItem,
  readCategories,
  readItemById
} 