-- Insert sample data into 'department'
INSERT INTO department (name) VALUES 
('Human Resources'),
('Engineering'),
('Sales');

-- Insert sample data into 'role'
-- Make sure to use the correct 'department_id' values that correspond to the ids of the departments you inserted above.
-- You may need to retrieve these ids after insertion or set them explicitly if you know what they are.
INSERT INTO role (title, salary, department_id) VALUES 
('HR Manager', 65000.00, 1),
('Software Engineer', 75000.00, 2),
('Sales Representative', 50000.00, 3);

-- Insert sample data into 'employee'
-- For 'role_id', ensure the values correspond to the 'id' values of the roles you inserted above.
-- For 'manager_id', it's assuming that the employee with id 1 is a manager, and 'NULL' signifies no manager.
-- Adjust these values according to your actual data or leave NULL if not applicable.
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Jim', 'Brown', 3, 1);
