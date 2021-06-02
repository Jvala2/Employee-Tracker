const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
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
            "View Roll",
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
            case "View Roll":
                viewRoll();
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

  function viewEmployee() {
  
    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Viewing Employees");
  
      firstPrompt();
    });
  }






  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    readColleges();
  });