export const createUserController = (userServices) => ({
  getUser: async (req, res) => {
    const user = await userServices.getUserByID(req.params.id);
    console.log("id is: " + req.params.id);
    res.json(user);
  },
  loginUser: async (req, res) => {
        const token = await userServices.authenticateUser(req.body.username, req.body.password);
        console.log("token is " + token);
  
        res.cookie("token", token, cookieOptions);
  
        res.status(200).json({ message: 'Logged in' });
    },
});
