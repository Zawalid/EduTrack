# Fastify Grades API

This is a Fastify-based REST API that manages student grades using MongoDB and Mongoose.

## Features
- Create, read, update, and delete grades
- Fetch student grades by ID
- Compute average and top grades
- Fetch distinct subjects and grade types
- Seed database with sample grades
- Uses Fastify for high-performance routing
- MongoDB as the database with Mongoose ODM

## Installation

1. Install dependencies:
   
   ```sh
   npm install
   ```
2. Create a `.env` file with the following format:
   ```env
   NODE_ENV=development
   PORT=3000

   MONGODB_DB_NAME=your_db_name
   MONGODB_USER=your_user
   MONGODB_PASSWORD=your_password
   MONGODB_LOCAL_URI=mongodb://localhost:27017/<DB_NAME>
   MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@cluster0.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Grades
- **POST /api/grades/** – Create a new grade
- **GET /api/grades/** – Get all grades
- **GET /api/grades/:id** – Get a grade by ID
- **PATCH /api/grades/:id** – Update a grade by ID
- **DELETE /api/grades/:id** – Delete a grade by ID

### Analytics
- **GET /api/grades/average/:student_id** – Get average grade for a student
- **GET /api/grades/top/:student_id** – Get top grade for a student
- **GET /api/grades/top3/:subject** – Get top 3 grades for a subject
- **GET /api/grades/types** – Get available grade types
- **GET /api/grades/subjects** – Get available subjects

### Seeding Data
- **POST /api/grades/seed/:number** – Seed the database with a specified number of random grades
- **Run manually:**
   ```sh
   npm run seed <number>
   ```

## Technologies Used
- **Fastify** – Web framework for Node.js
- **Mongoose** – ODM for MongoDB
- **MongoDB** – NoSQL database
- **Dotenv** – Environment variable management

