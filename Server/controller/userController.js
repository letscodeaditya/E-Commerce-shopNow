const User = require("../Model/userModel");


const SignUp = async (req, res) => {
    const { name, email, password, userType } = req.body;

    // Check for required fields
    if (!name || !email || !password || !userType) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create the new user
        const user = await User.create(req.body);
        return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Error during sign up:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
    }

    try {
     
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = (user.password === password); 
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

       
        const userDetail = { name: user.name, email: user.email, pic: user.pic, userType: user.userType, id: user.id };
        return res.status(200).json({ message: 'Login successful', userDetail });
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred during login', error });
    }
};

module.exports = { SignUp, Login };
