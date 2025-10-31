# Inventory Application

A simple and efficient Inventory Management Web Application built with Node.js, Express, EJS, and PostgreSQL, allowing users to manage items and categories easily. Demonstrates full-stack CRUD operations with proper database integration and deployment on Vercel using Neon PostgreSQL.

🔗 [Live Demo](https://inventory-application-eta.vercel.app/)

## Features

- ✨ Add, Edit, and Delete Items (name, description, category, quantity, price)
- 📂 Category Management (create, view, remove)
- 🔐 Admin Password Protection for sensitive operations
- 🗄️ PostgreSQL Database Integration
- 🏗️ MVC Architecture (Model–View–Controller)
- 🎨 Dynamic EJS Views with CSS styling
- 🚀 Deployment on Vercel using Neon PostgreSQL

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: 
  - Local: PostgreSQL
  - Production: Neon PostgreSQL
- **View Engine**: EJS
- **Styling**: CSS
- **Hosting**: Vercel
- **Environment**: dotenv
- **Language**: JavaScript

## Project Structure

```
Inventory-Application/
├── controllers/        # Contains route controller logic
├── db/                 # Database connection (pool.js) & queries.js
├── public/            # Static files (CSS, images)
├── routes/            # Route definitions
├── views/             # EJS templates
├── seed.js            # Script to create and seed tables
├── app.js             # Main Express application
├── package.json
├── .env               # Environment variables
└── README.md
```

## Setup Instructions

1. **Clone Repository**
   ```bash
   git clone https://github.com/Kunal-Vala/Inventory-Application.git
   cd Inventory-Application
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create .env File**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=inventory_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   ADMIN_PASSWORD=your_admin_password
   DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
   ```

4. **Initialize Database**
   ```bash
   node seed.js
   ```

5. **Start Server**
   ```bash
   npm start
   ```
   Visit `http://localhost:3000` in your browser

## Deployment

The application is deployed on Vercel using Neon PostgreSQL for the database.

### Deployment Steps

1. Push code to GitHub
2. Import repository into Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
4. Deploy project

> Note: You can use the seed.js script locally to initialize your Neon database before deployment.

## Example Data

The application comes with sample data including:

| Item | Category | Quantity | Price |
|------|----------|----------|--------|
| Laptop | Electronics | 10 | $999.99 |
| Smartphone | Electronics | 20 | $699.99 |
| Python Programming | Books | 15 | $29.99 |
| T-Shirt | Clothing | 50 | $19.99 |
| Garden Tools Set | Home & Garden | 5 | $89.99 |

## Future Improvements

- 👤 User authentication system (login/signup)
- 📱 Responsive UI
- 🔍 Pagination and search functionality
- 📊 Dashboard analytics (charts & reports)
- 📥 Export data (CSV/PDF)


## Author

**Kunal Vala**  
Computer Engineering Student  
[GitHub Profile](https://github.com/Kunal-Vala)

## License

This project is licensed under the MIT License.