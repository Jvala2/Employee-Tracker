const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db',
  });

  connection.connect(function (error) {
    if (error) throw error;
    mainMenu();
  });

  function mainMenu() {

    inquirer
      .prompt({
        type: "checkbox",
        name: "Menu",
        message: "Main Menu.",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View Department",
            "View Role",
            "View Employee",
            "Update Employee Role",
            "End"]
      })
      .then(function ({ task }) {
        switch (task) {
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "View Department":
                viewDepartment();
                break;
            case "View Role":
                viewRole();
                break;
            case "View Employee":
                viewEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "End":
                connection.end();
                break;
        }
      });
  }

function addDepartment() {
  inquirer.prompt([
      {
      type: "input",
      name: "name",
      message: "Enter Department name."
  } ]).then(function(res) {
      console.log(res, "response")
      connection.query("INSERT INTO departments SET ?", res.name, function(err, data) {
          if (err) throw (err);
          console.table(`Added${name}`);
          trackerQuestions();
      })
  })
}

  function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "Enter Employee's first name"
},
{
    type: "input",
    name: "lastName",
    message: "Enter Employee's last name"
},
    {
      type: "input",
      name: "roleId",
      message: "Enter the id of this Employee's role."
  },
  {
      type: "number",
      name: "managerId",
      message: "Enter this Employee's Manager's Id"

}]).then(function(res) {
    connection.query("INSERT INTO employee (first_name, last_name) VALUES (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
        if (err) throw err;
        console.table(`Added${firstName, lastName}`);
        mainMenu();
    })
})
};


function viewEmployee() {
  connection.query("Select * from employee", function (err, data) {
    if (err) throw err;
      console.table(data);
      mainMenu();
  })
}


  function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, data) {
      if (err) throw err;
        console.table(data);
        mainMenu();
    })
}

function viewRole() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
      console.table(data);
      mainMenu();
  })
}

function updateEmployeeRole() {
  inquirer.prompt([
      {
       message: "Enter the name of the Employee being updated.",
       type: "input",
       name: "name"   
      },
      {
          message: "Enter the role id number",
          type: "number",
          name: "role_id"
      }
  ]).then(function (response) {
      connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data){
          console.table(data);
      })
  })
}

