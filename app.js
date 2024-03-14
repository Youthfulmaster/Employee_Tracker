// app.js

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

async function mainMenu() {
  try {
    const answer = await inquirer.prompt([{
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
    }]);

    switch (answer.action) {
      case 'View All Departments':
        await displayDepartments();
        break;
      case 'View All Roles':
        await displayRoles();
        break;
      case 'View All Employees':
        await displayEmployees();
        break;
      case 'Add Department':
        await promptForDepartmentDetails();
        break;
      case 'Add Role':
        await promptForRoleDetails();
        break;
      case 'Add Employee':
        await promptForEmployeeDetails();
        break;
      case 'Update Employee Role':
        await promptForEmployeeRoleUpdate();
        break;
      case 'Exit':
        console.log('Exiting the application. Goodbye!');
        return; // Prevents the recursive call after exit
    }

    await mainMenu(); // Recursively call mainMenu to allow further operations
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

async function displayDepartments() {
  const results = await getDepartments();
  console.table(results);
}

async function displayRoles() {
  const results = await getRoles();
  console.table(results);
}

async function displayEmployees() {
  const results = await getEmployees();
  console.table(results);
}

async function promptForDepartmentDetails() {
  const { departmentName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: "What is the department's name?",
      validate: input => input ? true : 'Please enter a department name.'
    }
  ]);
  
  await addDepartment(departmentName);
  console.log(`Department '${departmentName}' added successfully!`);
}

async function promptForRoleDetails() {
  const departments = await getDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({ name, value: id }));
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "What is the role's title?",
      validate: input => input ? true : 'Please enter a role title.'
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the role's salary?",
      validate: input => input && !isNaN(input) ? true : 'Please enter a valid salary.'
    },
    {
      type: 'list',
      name: 'departmentId',
      message: "Which department does the role belong to?",
      choices: departmentChoices
    }
  ]);

  await addRole(title, salary, departmentId);
  console.log(`Role '${title}' added successfully!`);
}

async function promptForEmployeeDetails() {
  const roles = await getRoles();
  const employees = await getEmployees();
  const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));
  const managerChoices = [{ name: 'None', value: null }, ...employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))];
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
      validate: input => input ? true : 'Please enter a first name.'
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: input => input ? true : 'Please enter a last name.'
    },
    {
      type: 'list',
      name: 'roleId',
      message: "What is the employee's role?",
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Who is the employee's manager?",
      choices: managerChoices
    }
  ]);

  await addEmployee(firstName, lastName, roleId, managerId);
  console.log(`Employee '${firstName} ${lastName}' added successfully!`); // This line was missing
}
