import React, { useEffect } from "react";
import FBicon from "../svgs/fbIcon.jsx";
import AppleIcon from "../svgs/appleIcon.jsx";
import GoogleIcon from "../svgs/GoogleIcon.jsx";
import Check from "../svgs/check.jsx";
import { Formik, useFormik } from "formik";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCancel } from "@fortawesome/free-solid-svg-icons";
import { localStore } from "../store/store.js";
import RoleSwitch from "./roleSwitch.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const [open, setOpen] = React.useState(false);
  const { setRole, role } = localStore();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faCancel} />
      </IconButton>
    </React.Fragment>
  );

  const { setShowLoginPage, setLoginStatus } = localStore();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(!role);
    formik.setValues({ ...formik.values, role: !role });
  }, [role]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: role,
    },
    validate: (values) => {
      if (!values.email || !values.password) {
        handleClick();
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(values);
      await axios
        .post("http://localhost:8080/api/login", values)
        .then((res) => {
          localStorage.setItem("token", res.data.role);
          setLoginStatus();
          navigate("/student");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="w-[30%] min-w-[300px] relative bg-transparent backdrop-blur-lg md:flex-0 shrink-0">
      <div
        className="absolute top-0 right-5 text-white p-2 z-10  transition duration-150 hover:scale-150 hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setShowLoginPage();
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
      </div>
      <div className="relative text-white z-0 flex flex-col min-w-0 break-words  border-0 shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="p-3 text-center  border-b-0 rounded-t-2xl">
          <h5>Login with</h5>
        </div>
        <div className="flex flex-wrap gap-2 justify-center sm:px-6 xl:px-12">
          <div className="flex-0">
            <a className="inline-block w-full p-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent  rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
              <FBicon className={"transition duration-150 hover:scale-150"} />
            </a>
          </div>
          <div className=" flex-0">
            <a className="inline-block w-full p-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent  rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
              <AppleIcon
                className={"transition duration-150 hover:scale-150"}
              />
            </a>
          </div>
          <div className=" flex-0">
            <a className="inline-block w-full p-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent  rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
              <GoogleIcon
                className={"transition duration-150 hover:scale-150"}
              />
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 relative w-full max-w-full px-3  text-center shrink-0">
            <hr className=" text-slate-500   w-[30%] opacity-20" />
            <p className="z-20 inline  font-semibold leading-normal  text-sm text-slate-400">
              or
            </p>
            <hr className=" text-slate-500 w-[30%] opacity-20" />
          </div>
        </div>
        <div className="flex-auto p-6">
          <form
            role="form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex flex-col  gap-2 items-center w-full mb-4">
              <RoleSwitch />
              <div className="relative">
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  className="input"
                  placeholder="email"
                />
                <span className="input_border"></span>
              </div>
              <div className="relative">
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <span className="input_border"></span>
              </div>
            </div>

            <div className="text-center">
              <button
                className="inline-block bg-[#8C6A5D] px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-[105%] hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default LoginCard;
