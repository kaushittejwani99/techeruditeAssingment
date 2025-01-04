This project is a User Registration and Authentication System built using Node.js, Express.js, Sequelize, and SQLite (or any other supported database). It supports user and admin registration, login, and email verification using a secure token-based approach.

Features

Customer and Admin Registration

Email Verification for registered users

Secure Password Hashing using bcrypt.js

Admin Login with Role Verification

Error Handling for robust functionality

Prerequisites

Make sure you have the following installed on your system:

Node.js (version 14 or higher)

npm (Node Package Manager)

Getting Started

Installation

Clone this repository to your local machine:

git clone https://github.com/your-repo-name/your-project.git

Navigate into the project directory:

cd your-project

Install the required dependencies:

npm install

Project Structure

.
├── connection.js              # Sequelize database connection setup
├── mailer.js                  # Function for sending verification emails
├── model/
│   └── user.model.js          # Sequelize model for User
├── customerRegistration.html  # Registration form for customers
├── adminRegistration.html     # Registration form for admins
├── adminLogin.html            # Login form for admins
├── index.js                    # Main application file
├── package.json               # Project metadata and dependencies
└── README.md                  # Documentation (this file)

Database Configuration

The database connection is handled in connection.js. Ensure your Sequelize connection configuration matches your database setup.

Running the Application

Start the server:

npm start

The application will be available at:

http://localhost:3000

Routes

Method

Route

Description

GET

/customer-registration

Displays the customer registration form

POST

/customer-registration

Handles customer registration

GET

/admin-registration

Displays the admin registration form

POST

/admin-registration

Handles admin registration

GET

/admin-login

Displays the admin login form

POST

/admin-login

Handles admin login

GET

/verify-email

Verifies user email with a token

Environment Variables

Create a .env file to store your sensitive information:

DATABASE_URL=your-database-url
EMAIL_SERVICE=your-email-service
EMAIL_USERNAME=your-email-username
EMAIL_PASSWORD=your-email-password

Security Features

Passwords are securely hashed using bcrypt.js.

Email verification tokens are generated using crypto for secure verification.

Error Handling

Comprehensive error handling is implemented to manage common issues such as:

Database connection failures

Invalid or expired email verification tokens

Role-based access restrictions

Dependencies

express

body-parser

bcryptjs

sequelize

crypto

You can check the full list of dependencies in package.json.

Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (feature/your-feature-name).

Commit your changes (git commit -m 'Add your feature').

Push to the branch (git push origin feature/your-feature-name).

Open a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgements

Node.js

Express.js

Sequelize

bcrypt.js
