const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const requireSignIn = async (req, res, next) => {
    try {
        // Extract the token from the authorization header
        const token = req.headers.authorization;

        // Check if the token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthenticated Access - Token missing',
            });
        }

        // Verify the token
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // Attach the decoded information to the request object
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        
        console.error(error);
        return res.status(401).json({
            success: false,
            message: 'Unauthenticated Access - Invalid Token',
        });
    }
};
//////////////////////test 

const testController = (req, res) => {
    try {
        res.send("protected route")

    
   } catch (error) {
    console.log(error)
   }
}

/////////////////////is admin

const isAdmin = async (req, res, next) => {
    try {
        

        console.log('req.user:', req.user);

        if (!req.user || !req.user._id || !req.user.role) {
            console.log('Invalid req.user');
            console.log("rq.user",req.user);
            console.log("rq.user id",req.user._id)
            console.log("rq.user role",req.user.role)

            return res.status(401).send({
                success: false,
                message: 'Unauthenticated Access',
            });
        }

        // Find user by ID and log user details
        const user = await userModel.findById(req.user._id);
        console.log('user from database:', user);

        if (!user) {
            console.log('User not found');
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access',
            });
        }

        // Log user role
        console.log('user role:', user.role);
          //default user is 0 , admin is 1
        if (user.role !== 1) {
            console.log('Invalid user role:', user.role);
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access',
            });
        }

        console.log('User is an admin');
        next();
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

 


module.exports ={ requireSignIn, isAdmin,testController}
