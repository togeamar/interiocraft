-- Dummy Data for InterioCraft Database

-- Note: The password for all users (admin and customers) is 'password'
-- BCrypt Hash: $2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlNBxBFve4ZlL.

-- 1. Insert Admin
INSERT INTO admin (created_on, last_updated, first_name, last_name, email, password, phone_number)
VALUES (CURRENT_DATE, CURRENT_TIMESTAMP, 'Super', 'Admin', 'admin@interiocraft.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlNBxBFve4ZlL.', '9876543210');

-- 2. Insert Customers
INSERT INTO customer (created_on, last_updated, first_name, last_name, email, password, phone_number)
VALUES 
(CURRENT_DATE, CURRENT_TIMESTAMP, 'John', 'Doe', 'john.doe@example.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlNBxBFve4ZlL.', '9876543211'),
(CURRENT_DATE, CURRENT_TIMESTAMP, 'Jane', 'Smith', 'jane.smith@example.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlNBxBFve4ZlL.', '9876543212');

-- 3. Insert Designers
INSERT INTO designer (created_on, last_updated, name, email, number, experience, rating, total_projects_completed, is_available)
VALUES 
(CURRENT_DATE, CURRENT_TIMESTAMP, 'Alice Designer', 'alice@design.com', '9876543213', 5, 4.5, 10, true),
(CURRENT_DATE, CURRENT_TIMESTAMP, 'Bob Architect', 'bob@design.com', '9876543214', 8, 4.8, 20, true),
(CURRENT_DATE, CURRENT_TIMESTAMP, 'Charlie Decor', 'charlie@design.com', '9876543215', 3, 4.0, 5, false);

-- 4. Insert Projects
-- Project 1: Requested by John Doe, No Designer yet
INSERT INTO project (created_on, last_updated, project_name, customer_id, designer_id, location, budget, project_status, status_message, feedback, project_type, area_sqft, start_date, completion_date, address, city, state)
VALUES 
(CURRENT_DATE, CURRENT_TIMESTAMP, 'Modern Living Room', 1, NULL, 'New York', 50000.00, 'REQUESTED', 'Looking for a modern design.', NULL, 'Residential', 500.00, NULL, NULL, '123 Main St', 'New York', 'NY');

-- Project 2: Ongoing, John Doe, Assigned to Alice
INSERT INTO project (created_on, last_updated, project_name, customer_id, designer_id, location, budget, project_status, status_message, feedback, project_type, area_sqft, start_date, completion_date, address, city, state)
VALUES 
(CURRENT_DATE, CURRENT_TIMESTAMP, 'Office Renovation', 1, 1, 'San Francisco', 150000.00, 'ONGOING', 'Work in progress.', NULL, 'Office', 2000.00, '2023-01-15', '2023-06-15', '456 Market St', 'San Francisco', 'CA');

-- Project 3: Completed, Jane Smith, Assigned to Bob
INSERT INTO project (created_on, last_updated, project_name, customer_id, designer_id, location, budget, project_status, status_message, feedback, project_type, area_sqft, start_date, completion_date, address, city, state)
VALUES 
(CURRENT_DATE, CURRENT_TIMESTAMP, 'Cozy Bedroom', 2, 2, 'Chicago', 30000.00, 'COMPLETED', 'Project completed successfully.', 'Great work!', 'Residential', 300.00, '2022-11-01', '2022-12-20', '789 Lake Dr', 'Chicago', 'IL');
