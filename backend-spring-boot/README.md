# Spring Boot Student API

This is a Spring Boot-based REST API that manages student data using a MySQL database.

## Features
- Create, read, update, and delete student records
- Fetch student details by ID
- Uses Spring Boot with JPA for database interactions
- MySQL as the database

## Installation

1.  Configure the database in `application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
   spring.datasource.username=your_user
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
   ```
3. Build and run the application:

   ```sh
   mvn spring-boot:run
   ```

## API Endpoints

### Students
- **GET /api/students/** – Get all students
- **GET /api/students/{id}** – Get a student by ID
- **POST /api/students/** – Create a new student
- **PATCH /api/students/{id}** – Update student details
- **DELETE /api/students/{id}** – Delete a student
- **DELETE /api/students/delete** – Delete multiple student
- **POST /api/students/seed/:number** – Seed the database with a specified number of random students


## Technologies Used
- **Spring Boot** – Backend framework
- **Spring Data JPA** – ORM for database operations
- **MySQL** – Relational database
- **Maven** – Build and dependency management
