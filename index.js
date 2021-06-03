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

}]).then(function(res) {
    connection.query("INSERT INTO employee (first_name, last_name) VALUES (?, ?,)", [res.firstName, res.lastName], function(err, data) {
        if (err) throw err;
        console.table(`Added${firstName, lastName}`);
        mainMenu();
    })
})
};

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


  function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        mainMenu();
    })
}




  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    readColleges();
  });