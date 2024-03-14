const pool = require('../db'); // Adjust the import path as needed.

const getDepartments = async () => {
  const query = 'SELECT * FROM department';
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error('Error executing getDepartments query', err.stack);
    throw err;
  }
};

const getRoles = async () => {
  const query = 'SELECT * FROM role';
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error('Error executing getRoles query', err.stack);
    throw err;
  }
};

const getEmployees = async () => {
  const query = 'SELECT * FROM employee';
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error('Error executing getEmployees query', err.stack);
    throw err;
  }
};

const addDepartment = async (name) => {
  const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *';
  try {
    const { rows } = await pool.query(query, [name]);
    return rows[0];
  } catch (err) {
    console.error('Error executing addDepartment query', err.stack);
    throw err;
  }
};

const addRole = async (title, salary, department_id) => {
  const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
  try {
    const { rows } = await pool.query(query, [title, salary, department_id]);
    return rows[0];
  } catch (err) {
    console.error('Error executing addRole query', err.stack);
    throw err;
  }
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
  try {
    // manager_id can be null if the employee has no manager.
    const { rows } = await pool.query(query, [first_name, last_name, role_id, manager_id || null]);
    return rows[0];
  } catch (err) {
    console.error('Error executing addEmployee query', err.stack);
    throw err;
  }
};

const updateEmployeeRole = async (employee_id, role_id) => {
  const query = 'UPDATE employee SET role_id = $2 WHERE id = $1 RETURNING *';
  try {
    const { rows } = await pool.query(query, [employee_id, role_id]);
    return rows[0];
  } catch (err) {
    console.error('Error executing updateEmployeeRole query', err.stack);
    throw err;
  }
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
