const inquirer = require('inquirer');

const viewDepartmentsPrompt = () => {
  // No input required from the user to view departments
  // so this function is not needed unless you want a confirmation prompt
};

const viewRolesPrompt = () => {
  // Same as above, viewing does not require input
};

const viewEmployeesPrompt = () => {
  // Same as above, viewing does not require input
};

const addDepartmentPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the new department?',
      validate: input => {
        if (input.length === 0) {
          return 'Please enter a department name.';
        }
        return true;
      }
    }
  ]);
};

const addRolePrompt = (departments) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?',
      validate: input => {
        if (input.length === 0) {
          return 'Please enter a role title.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',
      validate: input => {
        if (isNaN(input) || input <= 0) {
          return 'Please enter a valid salary.';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department does this role belong to?',
      choices: departments // This should be an array of department names fetched from the database
    }
  ]);
};

const addEmployeePrompt = (roles, managers) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the new employee's first name?",
      validate: input => {
        if (input.length === 0) {
          return 'Please enter the first name.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the new employee's last name?",
      validate: input => {
        if (input.length === 0) {
          return 'Please enter the last name.';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'roleId',
      message: "What is this employee's role?",
      choices: roles // This should be an array of roles fetched from the database
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Who is this employee's manager?",
      choices: managers // This should be an array of managers fetched from the database, with an option for 'None'
    }
  ]);
};

const updateEmployeeRolePrompt = (employees, roles) => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: "Which employee's role do you want to update?",
      choices: employees // This should be an array of employees fetched from the database
    },
    {
      type: 'list',
      name: 'roleId',
      message: "Which role do you want to assign to the selected employee?",
      choices: roles // This should be an array of roles fetched from the database
    }
  ]);
};

module.exports = {
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeeRolePrompt
  // No export for view*Prompt functions if not needed
};
