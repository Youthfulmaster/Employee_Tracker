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
const {
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeeRolePrompt
} = require('./lib/prompts');

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
        await promptAddDepartment();
        break;
      case 'Add Role':
        await promptAddRole();
        break;
      case 'Add Employee':
        await promptAddEmployee();
        break;
      case 'Update Employee Role':
        await promptUpdateEmployeeRole();
        break;
      case 'Exit':
        console.log('Exiting the application. Goodbye!');
        process.exit();
    }

    // Recursively call mainMenu to allow further operations
    await mainMenu();
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

async function displayDepartments() {
  try {
    const results = await getDepartments();
    console.table(results);
  } catch (err) {
    console.error(err);
  }
}

async function displayRoles() {
  // Placeholder for your implementation
}

async function displayEmployees() {
  // Placeholder for your implementation
}

async function promptAddDepartment() {
  try {
    const { departmentName } = await addDepartmentPrompt();
    await addDepartment(departmentName);
    console.log('Department added successfully!');
  } catch (err) {
    console.error(err);
  }
}

async function promptAddRole() {
  try {
    // Fetch departments to let the user choose which department the role belongs to
    const departments = await getDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    // Ask for the new role details
    const roleDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role?',
        validate: input => input ? true : 'Please enter a title.'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this role?',
        validate: input => !isNaN(parseFloat(input)) && isFinite(input) ? true : 'Please enter a valid salary.'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Which department does this role belong to?',
        choices: departmentChoices,
        validate: input => input ? true : 'Please select a department.'
      }
    ]);

    // Call the query function to add the new role to the database
    await addRole(roleDetails.title, roleDetails.salary, roleDetails.departmentId);
    console.log(`Role '${roleDetails.title}' added successfully!`);
  } catch (err) {
    console.error('Failed to add the new role:', err);
  }
}


async function promptAddEmployee() {
  try {
    // Fetch roles and employees for the user to choose from
    const roles = await getRoles();
    const employees = await getEmployees();
    
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    // Optionally add an option for no manager
    managerChoices.push({ name: 'None', value: null });

    // Ask for the new employee's details
    const employeeDetails = await inquirer.prompt([
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
        choices: roleChoices,
        validate: input => input ? true : 'Please select a role.'
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Who is the employee's manager?",
        choices: managerChoices,
        validate: input => input ? true : 'Please select a manager.'
      }
    ]);

    // Call the query function to add the new employee to the database
    await addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId);
    console.log(`Employee '${employeeDetails.firstName} ${employeeDetails.lastName}' added successfully!`);
  } catch (err) {
    console.error('Failed to add the new employee:', err);
  }
}


async function promptUpdateEmployeeRole() {
  try {
    // Fetch roles and employees to present options to the user
    const roles = await getRoles();
    const employees = await getEmployees();

    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    // Prompt user to choose an employee and a new role
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Which employee's role do you want to update?",
        choices: employeeChoices,
        validate: input => input ? true : 'Please select an employee.'
      },
      {
        type: 'list',
        name: 'roleId',
        message: "What is the employee's new role?",
        choices: roleChoices,
        validate: input => input ? true : 'Please select a role.'
      }
    ]);

    // Call the query function to update the employee's role in the database
    await updateEmployeeRole(employeeId, roleId);
    console.log(`Employee's role updated successfully!`);
  } catch (err) {
    console.error('Failed to update the employee role:', err);
  }
}


// Start the application
mainMenu();
