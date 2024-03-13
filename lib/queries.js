const connection = require('./db');

const getDepartments = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, name FROM department';
    connection.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getRoles = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT r.id, r.title, r.salary, d.name AS department
      FROM role r
      JOIN department d ON r.department_id = d.id
    `;
    connection.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getEmployees = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
             CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `;
    connection.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const addDepartment = (departmentName) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO department (name) VALUES (?)';
    connection.query(query, departmentName, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const addRole = (title, salary, departmentId) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    connection.query(query, [title, salary, departmentId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const addEmployee = (firstName, lastName, roleId, managerId) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [firstName, lastName, roleId, managerId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const updateEmployeeRole = (employeeId, roleId) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    connection.query(query, [roleId, employeeId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
