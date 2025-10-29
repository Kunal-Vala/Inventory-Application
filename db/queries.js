const pool = require('./pool')

async function readAllItems() {
    const { rows } = await pool.query('SELECT * FROM item')
    return rows
}

async function insertItem(item) {
    const query = `
    INSERT INTO item (name, description, category_id, qty)
    VALUES ($1, $2, $3, $4)
  `;
    const values = [item.name, item.description, item.category_id, item.qty];

    await pool.query(query, values);
}

module.exports = {
    readAllItems,
    insertItem,
} 