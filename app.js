const inquirer = require('inquirer');
const { 
  getDepartments, 
  getRoles, 
  getEmployees, 
  addDepartment, 
  addRole, 
  addEmployee, 
  updateEmployeeRole 
} = require('./lib/queries');
const { 
  addDepartmentPrompt, 
  addRolePrompt, 
  addEmployeePrompt, 
  updateEmployeeRolePrompt 
} = require('./lib/prompts');

function mainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit'
      ]
    }
  ]).then(answer => {
    switch(answer.action) {
      case 'View All Departments':
        displayDepartments();
        break;
      case 'View All Roles':
        displayRoles();
        break;
      case 'View All Employees':
        displayEmployees();
        break;
      case 'Add Department':
        promptAddDepartment();
        break;
      case 'Add Role':
        promptAddRole();
        break;
      case 'Add Employee':
        promptAddEmployee();
        break;
      case 'Update Employee Role':
        promptUpdateEmployeeRole();
        break;
      case 'Exit':
        process.exit();
    }
  }).catch(err => console.error(err));
}

function displayDepartments() {
  getDepartments()
    .then(results => {
      console.table(results);
      mainMenu();
    })
    .catch(err => console.error(err));
}

function displayRoles() {
  getRoles()
    .then(results => {
      console.table(results);
      mainMenu();
    })
    .catch(err => console.error(err));
}

function displayEmployees() {
  getEmployees()
    .then(results => {
      console.table(results);
      mainMenu();
    })
    .catch(err => console.error(err));
}

function promptAddDepartment() {
  addDepartmentPrompt()
    .then(({ departmentName }) => {
      return addDepartment(departmentName);
    })
    .then(() => {
      console.log('Department added successfully!');
      mainMenu();
    })
    .catch(err => console.error(err));
}

function promptAddRole() {
  getDepartments()
    .then(departments => {
      return addRolePrompt(departments.map(dept => ({ name: dept.name, value: dept.id })));
    })
    .then(({ title, salary, departmentId }) => {
      return addRole(title, salary, departmentId);
    })
    .then(() => {
      console.log('Role added successfully!');
      mainMenu();
    })
    .catch(err => console.error(err));
}

function promptAddEmployee() {
  Promise.all([getRoles(), getEmployees()])
    .then(([roles, employees]) => {
      return addEmployeePrompt(
        roles.map(role => ({ name: role.title, value: role.id })),
        employees.map(emp => ({ name: emp.first_name + ' ' + emp.last_name, value: emp.id })).concat([{ name: 'None', value: null }])
      );
    })
    .then(({ firstName, lastName, roleId, managerId }) => {
      return addEmployee(firstName, lastName, roleId, managerId);
    })
    .then(() => {
      console.log('Employee added successfully!');
      mainMenu();
    })
    .catch(err => console.error(err));
}

function promptUpdateEmployeeRole() {
  Promise.all([getEmployees(), getRoles()])
    .then(([employees, roles]) => {
      return updateEmployeeRolePrompt(
        employees.map(emp => ({ name: emp.first_name + ' ' + emp.last_name, value: emp.id })),
        roles.map(role => ({ name: role.title, value: role.id }))
      );
    })
    .then(({ employeeId, roleId }) => {
      return updateEmployeeRole(employeeId, roleId);
    })
    .then(() => {
      console.log("Employee's role updated successfully!");
      mainMenu();
    })
    .catch(err => console.error(err));
}

// Start the application
mainMenu();
