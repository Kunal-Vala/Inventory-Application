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


async function insertCategory(category) {
  const query = 'INSERT INTO category (name) VALUES ($1)'

  try {
    await pool.query(query, [category]);
    console.log('Category inserted successfully');
  } catch (err) {
    console.error('INSERTION FAILED:', err);
  }

}

async function updateItem(item) {
  const updates = [];
  const values = [];
  let i = 1;

  if (item.name) {
    updates.push(`name = $${i++}`);
    values.push(item.name);
  }
  if (item.description) {
    updates.push(`description = $${i++}`);
    values.push(item.description);
  }
  if (item.category_id) {
    updates.push(`category_id = $${i++}`);
    values.push(item.category_id);
  }
  if (item.qty) {
    updates.push(`qty = $${i++}`);
    values.push(item.qty);
  }

  if (updates.length === 0) {
    console.log('No fields to update');
    return;
  }

  const query = `
    UPDATE item
    SET ${updates.join(', ')}
    WHERE id = $${i}
  `;
  values.push(parseInt(item.id));

  try {
    await pool.query(query, values);
    console.log('Item updated successfully');
  } catch (err) {
    console.error('UPDATE FAILED:', err);
  }
}

async function deleteItem(id) {
  const query = 'DELETE FROM item where id = ($1)'

  await pool.query(query, [id])
}


async function deleteCategory(id) {
  const query = 'DELETE FROM category where id = ($1)'

  await pool.query(query, [id])
}




module.exports = {
  readAllItems,
  insertItem,
  readCategories,
  readItemById,
  insertCategory,
  updateItem,
  deleteCategory,
  deleteItem,
} 