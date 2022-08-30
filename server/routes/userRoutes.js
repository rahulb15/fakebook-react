import express from 'express';
import passport from 'passport';
import UserController from "../controllers/userController.js";
const router = express.Router();


const CLIENT_URL = "http://localhost:3000/";



router.get("/loginFailed", (req, res) => {
    res.status(401).json({ message: "Invalid credentials" });
}
);

router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.get("/logout", UserController.userLogout);
router.get("/getUser/:id", UserController.userGet);
router.put("/updateUser", UserController.userUpdate);
router.delete("/deleteUser/:id", UserController.userDelete);

//google auth
router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get("/auth/google/callback", passport.authenticate('google'));
router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: CLIENT_URL + "loginFailed" }), (req, res) => {
    console.log(req.user);
    res.redirect(CLIENT_URL + "dashboard");
}
);


//github auth
router.get('/auth/github',passport.authenticate('github', { scope: [ 'profile' ] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: CLIENT_URL + "loginFailed" }), (req, res) => {
    console.log(req.user);
    res.redirect(CLIENT_URL + "dashboard");
}
);

router.get("/auth/facebook", passport.authenticate('facebook', { scope: ['public_profile'] }));
router.get("/auth/facebook/callback", passport.authenticate('facebook', { failureRedirect: CLIENT_URL + "loginFailed" }), (req, res) => {
    console.log(req.user);
    res.redirect(CLIENT_URL + "dashboard");
}
);




export default router;