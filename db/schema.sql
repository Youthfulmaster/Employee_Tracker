-- Use the company database, or create it if it does not exist
CREATE DATABASE IF NOT EXISTS company_db;
USE company_db;

-- Drop tables if they already exist (be careful with this in a production environment)
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- Create the department table
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Create the role table
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,  -- Assuming salary has two decimal places
    department_id INT NOT NULL,
    CONSTRAINT fk_department
        FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_manager
        FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

