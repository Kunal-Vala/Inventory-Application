#! /usr/bin/env node
require('dotenv').config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS category (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS item (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INTEGER NOT NULL REFERENCES category(id) ON DELETE CASCADE,
  qty INTEGER NOT NULL CHECK (qty >= 0),
  price NUMERIC(10,2)
);


INSERT INTO category (name) VALUES 
  ('Electronics'),
  ('Books'),
  ('Clothing'),
  ('Home & Garden')
  ON CONFLICT DO NOTHING;


INSERT INTO item (name, description, category_id, qty, price) VALUES 
  ('Laptop', 'High-performance laptop', 1, 10, 999.99),
  ('Smartphone', 'Latest model', 1, 20, 699.99),
  ('Python Programming', 'Learn Python basics', 2, 15, 29.99),
  ('T-Shirt', 'Cotton casual wear', 3, 50, 19.99),
  ('Garden Tools Set', 'Complete gardening kit', 4, 5, 89.99)
  ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
