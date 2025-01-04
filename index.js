const express = require('express') // Importing express framework
const app = express() // Creating an express app instance
const port = 3000 // Defining the port number for the server
const bcrypt = require("bcryptjs"); // Importing bcryptjs for hashing passwords
const bodyParser = require("body-parser"); // Importing body-parser to parse incoming request bodies
const User = require('./model/user.model'); // Importing the User model to interact with the database
const sequelize = require("./connection"); // Importing sequelize connection for interacting with the database
const crypto = require('crypto'); // Importing the crypto module to generate random tokens
const sendVerificationEmail = require('./mailer'); // Importing a custom function for sending verification emails

// Synchronizing the database models with the database
(async () => {
    try {
        // Synchronize the model with the database (force: true drops tables if they exist)
        await sequelize.sync(); 
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to display customer registration page
app.get("/customer-registration", function (req, res) {
    res.sendFile(__dirname + "/customerRegistration.html"); // Sending customer registration HTML file
});

// Route to handle customer registration form submission
app.post("/customer-registration", async function (req, res) {
    try {
        // Extracting form data (firstName, lastName, email, password)
        const { firstName, lastName, email, password } = req.body;

        // Hashing the password before saving
        const hashPassword = await bcrypt.hash(password, 10);

        // Generating a random verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');

        // Creating a new customer record in the database
        const newCustomer = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role: "customer" // Assigning the role as 'customer'
        });

        // Sending the verification email
        await sendVerificationEmail(email, verificationToken);

        // Responding with success message
        res.status(201).send("customer registered successfully");
    } catch (error) {
        console.log(error); // Logging errors if any
    }
});

// Route to display admin registration page
app.get("/admin-registration", function (req, res) {
    res.sendFile(__dirname + "/adminRegistration.html"); // Sending admin registration HTML file
});

// Route to handle admin registration form submission
app.post('/admin-registration', async function (req, res) {
    try {
        // Extracting form data (firstName, lastName, email, password)
        const { firstName, lastName, email, password } = req.body;

        // Hashing the password before saving
        const hashPassword = await bcrypt.hash(password, 10);

        // Generating a random verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');

        // Creating a new admin record in the database
        const newAdmin = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role: "admin" // Assigning the role as 'admin'
        });

        // Sending the verification email
        await sendVerificationEmail(email, verificationToken);

        // Responding with success message
        res.status(201).send("admin successfully registered");
    } catch (error) {
        console.log(error); // Logging errors if any
        res.status(500).send("Internal server error."); // Responding with an error message
    }
});

// Route to display admin login page
app.get("/admin-login", function (req, res) {
    res.sendFile(__dirname + "/adminLogin.html"); // Sending admin login HTML file
});

// Route to handle email verification
app.get('/verify-email', async (req, res) => {
    try {
        // Extracting the token from the query parameters
        const { token } = req.query;

        // Finding the user with the matching verification token
        const user = await User.findOne({ where: { verificationToken: token } });

        // If no user is found or token is invalid
        if (!user) {
            return res.status(400).send("Invalid or expired token.");
        }

        // Marking the user's email as verified
        user.isVerified = true;
        user.verificationToken = null; // Clearing the verification token after use
        await user.save(); // Saving the updated user

        // Responding with success message
        res.status(200).send("Email verified successfully! You can now log in.");
    } catch (error) {
        console.log(error); // Logging errors if any
        res.status(500).send("Internal server error."); // Responding with an error message
    }
});

// Route to handle admin login form submission
app.post("/admin-login", async function (req, res) {
    try {
        // Extracting form data (email, password)
        const { email, password } = req.body;

        // Finding the user with the provided email
        const user = await User.findOne({ where: { email: email } });

        // If the user is not found
        if (!user) {
            return res.status(400).send("Admin not found.");
        }

        // If the user is not an admin
        if (user.role != "admin") {
            res.status(400).send("You are not allowed to login from here");
        }

        // If the user's email is not verified
        if (!user.isVerified) {
            return res.status(400).send("Please verify your email before logging in.");
        }

        // Comparing the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is invalid
        if (!isPasswordValid) {
            return res.status(401).send("Invalid password.");
        }

        // Responding with success message after successful login
        res.status(200).send("Admin login successful.");
    } catch (error) {
        console.log(error); // Logging errors if any
        res.status(500).send("Internal server error."); // Responding with an error message
    }
});

// Starting the server on the defined port
app.listen(port, function () {
    console.log(`server successfully listening on ${port}`); // Logging server start message
});
