import * as React from "react";
// import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
// import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./Login.css";
import Register from "../register/Register";
import fakebook from "../../images/facebook-fakebook.png";
import iconFacebook from "../../images/icon-facebook.png";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    axios
      .post("http://localhost:5000/api/user/login", user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const google = () => {
    window.open("http://localhost:5000/api/user/auth/google", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/api/user/auth/facebook", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/api/user/auth/github", "_self");
  };

  return (
    <div class="container">
      <div class="row align-items-start">
        <div class="col">
          <img src={fakebook} alt="fakebook" />
          <h1>
            Fakebook helps you connect and share with the fake people in your
            life.
          </h1>
        </div>
        <div class="col">
          <Card
            sx={{
              maxWidth: 400,
              height: "22vw",
              margin: "auto",
              marginTop: "10%",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0 0 100px 0 rgba(0,0,0,0.2)",
            }}
          >
            <form className="loginBox" id="loginForm" method="POST">
              <CardContent>
                <div className="email" style={{ marginBottom: "20px" }}>
                  <TextField
                    required
                    id="outlined-basic"
                    label="Email Address"
                    name="email"
                    value={user.email}
                    style={{ width: "100%" }}
                    onChange={handleInput}
                  />
                </div>

                <div className="password">
                  <TextField
                    required
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    name="password"
                    style={{ width: "100%" }}
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
              </CardContent>
              <CardActions>
                <Button
                  className="button"
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                  style={{
                    width: "40%",
                    marginTop: "2px",
                    marginLeft: "10%",
                    padding: "7px 20px",
                  }}
                >
                  Login
                </Button>
                <Register />
              </CardActions>
            </form>
            <div className="loginBox">
              <hr className="hr-text" data-content="OR" />
              <div className="or" style={{ textAlign: "center" }}>
                {" "}
                OR{" "}
              </div>
              <hr className="hr-text" data-content="OR" />
              <div class="row align-items-start">
                <div class="col">
                  <img
                    src={iconFacebook}
                    alt="iconFacebook"
                    onClick={facebook}
                  />
                  {/* <button className="button" onClick={facebook}>Login with Facebook</button> */}
                </div>
                <div class="col">
                  <img
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    alt="iconGoogle"
                    onClick={google}
                  />
                  {/* <button className="button" onClick={google}>Login with Google</button> */}
                </div>
                <div class="col">
                  <img
                    src="https://img.icons8.com/color/48/000000/github--v1.png"
                    alt="iconGithub"
                    onClick={github}
                  />
                  {/* <button className="button" onClick={github}>Login with Github</button> */}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

//     <button className='button1' onClick={google}>Google</button>
//     <button className='button1' onClick={github}>GitHub</button>
//     <button className='button1' onClick={facebook}>Facebook</button>
//         </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }
