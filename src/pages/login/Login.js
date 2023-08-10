import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import {
  useUserDispatch,
  loginUser,
  registerUser,
} from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [errorText, setErrorText] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [firstNameValue, setFirstNameValue] = useState("");
  var [lastNameValue, setlastNameValue] = useState("");
  var [mobileNoValue, setMobileNoValue] = useState("");
  var [email, setEmail] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <Grid container className={classes.container}>
      {/* <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div> */}
      <img src="./greenify-removebg.png" alt="/" />

      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Hello User!
              </Typography>

              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your email or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                placeholder="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={email.length === 0 || passwordValue.length === 0}
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        email,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                        setErrorText,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your email or password :(
                </Typography>
              </Fade>
              <TextField
                id="firstName"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={firstNameValue}
                onChange={(e) => setFirstNameValue(e.target.value)}
                margin="normal"
                placeholder="First Name"
                type="text"
                fullWidth
              />
              <TextField
                id="lastName"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={lastNameValue}
                onChange={(e) => setlastNameValue(e.target.value)}
                margin="normal"
                placeholder="Last Name"
                type="text"
                fullWidth
              />
              <TextField
                id="mobileNo"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={mobileNoValue}
                onChange={(e) => setMobileNoValue(e.target.value)}
                margin="normal"
                placeholder="Mobile No."
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                placeholder="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      registerUser(
                        userDispatch,
                        firstNameValue,
                        lastNameValue,
                        mobileNoValue,
                        email,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                        setErrorText,
                      )
                    }
                    disabled={
                      email.length === 0 ||
                      passwordValue.length === 0 ||
                      lastNameValue.length === 0 ||
                      mobileNoValue.length === 0 ||
                      firstNameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
