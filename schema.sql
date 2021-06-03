DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50),
    department_id INT(50),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(50),
    salary DECIMAL (10, 2),
    department_id INT(50),
    PRIMARY KEY (id) 
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT(50),
    manager_id INT(50),
    PRIMARY KEY (id)
);

/*SELECT * FROM employee_db;*/