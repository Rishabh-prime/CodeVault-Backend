# CodeVault Backend

CodeVault Backend is a RESTful API built with **Node.js, Express.js, and MongoDB** that powers the CodeVault developer platform. It manages user authentication, question management, folder organization, task tracking, and code execution integration.

The backend provides secure APIs that allow users to manage coding problems, organize them into folders, and track their learning progress. Authentication is handled using **JWT tokens**, ensuring secure access to user-specific resources.

## Features

* User Authentication (Signup / Login)
* JWT-based Authorization
* Secure Password Hashing with bcrypt
* Question Management (Create, Read, Update, Delete)
* Folder Management
* Task Management System
* User-specific data handling
* Code execution API integration (compiler support)

## Tech Stack

Backend technologies used in this project:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt
* REST API architecture

## Project Structure

src
controllers/
models/
routes/
middleware/
config/

server.js

## API Modules

The backend is structured into several modules:

Authentication

* Register user
* Login user
* Token verification

Questions

* Create question
* Update question
* Delete question
* Fetch user questions

Folders

* Create folders
* Organize questions inside folders

Tasks

* Add tasks
* Update tasks
* Delete tasks

## Getting Started

### 1. Clone the repository

git clone https://github.com/yourusername/codevault-backend.git

### 2. Navigate to the project directory

cd codevault-backend

### 3. Install dependencies

npm install

### 4. Create environment variables

Create a `.env` file in the root directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### 5. Start the development server

npm run dev

The server will run on:

http://localhost:5000

## Frontend Repository

Frontend application for this project:

CodeVault Frontend → (Add frontend repo link here)

## Project Goal

This project was created to practice and demonstrate skills in:

* Backend API design
* Authentication systems
* MongoDB database modeling
* REST API development
* Full-stack application architecture

## Future Improvements

* Public solution publishing
* Comment system
* Folder sharing
* Rate limiting & security improvements
* Code execution service optimization

## Author

Rishabh Thakur
Frontend / Web Developer
