# E-Commerce MERN App

An e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. This app provides a platform for users to browse products, add them to a cart, and proceed to checkout.

## Table of Contents

- [Features](#features)
- [Screenshot](#Screenshot)
- [Technologies](#technologies)
- [Installation](#installation)

## Features

- User authentication and authorization
- Product listing and search
- Shopping cart functionality
- Order management
- Admin dashboard for managing products 
- Responsive design using Tailwind CSS

## Screenshot

![E-Commerce MERN App Application](screenshots/all.png)

## Technologies

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Other**: Axios, Mongoose, bcryptjs

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
  ```bash
git clone https://github.com/mursaleenmk3/MERN_E-Commerce.git

# 2. Navigate to the Project Directory
# Navigate into the project directory
cd MERN_E-Commerce

# 3. Install Backend Dependencies
# Navigate to the backend directory and install backend dependencies
cd backend
npm install

# 4. Set Up Environment Variables
# Create a .env file in the backend directory and set up environment variables. 
# You can use the provided .env.example file as a template
cp .env.example .env

# Then, open .env file and add necessary environment variables such as MongoDB URI, JWT secret, etc.

# 5. Install Frontend Dependencies
# Navigate to the frontend directory and install frontend dependencies
cd ../frontend
npm install

# 6. Start the Development Servers

# Start the Backend Server
# In the backend directory, start the backend server
# Use npm run dev for both frontend and admin
npm run dev

