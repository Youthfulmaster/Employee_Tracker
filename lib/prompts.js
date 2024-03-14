const inquirer = require('inquirer');

// Prompt for adding a new department
const addDepartmentPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the new department?',
      validate: input => input ? true : 'Please enter a department name.'
    }
  ]);
};

// Prompt for adding a new role
const addRolePrompt = (departments) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?',
      validate: input => input ? true : 'Please enter a role title.'
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
      message: 'Which department does the role belong to?',
      choices: departments.map(department => ({ name: department.name, value: department.id })),
      validate: input => input ? true : 'Please select a department.'
    }
  ]);
};

// Prompt for adding a new employee
const addEmployeePrompt = (roles, employees) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the new employee's first name?",
      validate: input => input ? true : 'Please enter a first name.'
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the new employee's last name?",
      validate: input => input ? true : 'Please enter a last name.'
    },
    {
      type: 'list',
      name: 'roleId',
      message: "What is the new employee's role?",
      choices: roles.map(role => ({ name: role.title, value: role.id })),
      validate: input => input ? true : 'Please select a role.'
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Who is the new employee's manager?",
      choices: [{ name: 'None', value: null }].concat(employees.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }))),
      validate: input => true // Allowing 'None' as a valid option
    }
  ]);
};

// Prompt for updating an employee's role
const updateEmployeeRolePrompt = (employees, roles) => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: "Which employee's role do you want to update?",
      choices: employees.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id })),
      validate: input => input ? true : 'Please select an employee.'
    },
    {
      type: 'list',
      name: 'roleId',
      message: "What is the new role?",
      choices: roles.map(role => ({ name: role.title, value: role.id })),
      validate: input => input ? true : 'Please select a role.'
    }
  ]);
};

module.exports = {
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeeRolePrompt
};
