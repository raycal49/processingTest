import { cookieOptions } from '../config/cookies.js';

export const createAuthController = (authServices) => ({
    loginUser: async (req, res) => {
      const token = await authServices.authenticateUser(req.body.username, req.body.password);
      console.log("In login, token is " + token);

      res.cookie("token", token, cookieOptions);

      return res.status(200).json({ message: 'Logged in' });
    },
    registerUser: async (req, res) => {
      const user = req.body;

      authServices.addUser(user); // will throw an error if the SQL insertion fails but... should we... error check token? no because the express 5 error-handling middleware will take care of it! i think

      console.log("In registration, token is " + token);

      res.cookie("token", token, cookieOptions);
      
      return res.status(200).json({ message: `${created.username}, your account was successfully created!`});
    }
})