import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Avatar } from "@material-ui/core";
import { useStyles } from "../../utils/useStyles";
import { LoadingClackers } from "../../utils/LoadingClackers";

export default function LoginForm(props) {
  const { showForm } = props;
  // const welcomeHeaderRef = React.useRef();
  // const { welcomeHeaderRef } = props.welcomeHeaderRef;

  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: {
      username: "demo",
      email: "d@em.o",
      password: "demodemo",
      terms: false,
    },
  });
  const history = useHistory();
  const classes = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const { dirtyFields } = formState;
  const authFormSTYLE = {
    fontSize: "4rem",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };
  // React.useLayoutEffect(() => {
  //   console.log({ showForm, refCurr: welcomeHeaderRef.current });
  //   if (showForm) {
  //     welcomeHeaderRef.current.style = {
  //       transform: "translateY(-10px)",
  //       transition: "all 3.5s ease 0s",
  //       textAlign: "center",
  //     };
  //   } else {
  //     //  welcomeHeaderRef.current.style.transform = "translateY(-10px)";
  //     // welcomeHeaderRef.current.style.transition = "all 3.5s ease 0s";
  //     // welcomeHeaderRef.current.style.textAlign = "center";
  //     welcomeHeaderRef.current.style = {
  //       transform: "translateY(10px)",
  //       transition: "all 3.5s ease 0s",
  //       textAlign: "center",
  //     };
  //   }
  // }, [showForm]);
  return (
    <>
      <Avatar
        className={classes.avatar}
        style={{
          backgroundColor: "indigo",
          zIndex: "unset",
          zIndex: "4 !important",
        }}
      >
        <LockOutlinedIcon />
      </Avatar>
      <div
        style={{
          overflow: "hidden",
          height: 20,
          background: "#5559ff",
          width: "100%",
          color: "white",
          fontSize: 20,
        }}
      >
        <p
          style={{
            transition: showForm ? "all .3s ease 1.4s" : "all .3s ease 0s",
            textAlign: "center",
            transform: showForm ? "translateY(-10px)" : "translateY(10px)",
            zIndex: 9,
          }}
        >
          Welcome Back Stranger
        </p>
        {/* <p ref={welcomeHeaderRef}> Welcome Back Stranger</p> */}
      </div>
      <form
        style={{ ...authFormSTYLE, fontSize: "4rem" }}
        onSubmit={handleSubmit(async (formData) => {
          setSubmitting(true);
          try {
            let { username, password, email } = formData;

            props.login(formData, history);
          } catch (error) {
            console.error(error);
          }
          setSubmitting(false);
        })}
      >
        <InputAnimated
          errText="What's your username?"
          inputAutoComplete="off"
          inputID="username"
          inputLabelText="Username"
          register={register({ required: "required" })}
          inputType="username"
          isDirty={!!dirtyFields.username}
          isErr={!!errors.username}
        />
        <InputAnimated
          errText="Please provide an email."
          inputAutoComplete="off"
          inputID="email"
          inputLabelText="Email"
          register={register({ required: "required" })}
          inputType="email"
          isDirty={!!dirtyFields.email}
          isErr={!!errors.email}
        />
        <InputAnimated
          errText="Password is required."
          inputAutoComplete="off"
          inputID="password"
          inputLabelText="Password"
          inputType="password"
          isDirty={!!dirtyFields.password}
          isErr={!!errors.password}
          register={register({ required: "required" })}
        />

        <div className="termsContainer" style={{ filter: "#ffffff" }}>
          <input type="checkbox" name="terms" id="terms" ref={register()} />
          <label htmlFor="terms">Remember Me</label>
        </div>
        <div className="button">
          <button type="submit" disabled={props.isLoading}>
            {!props.isLoading ? (
              "Login"
            ) : (
              <span>
                <LoadingClackers
                  style={{ transform: " scale(0.25)", fontSize: "10rem" }}
                  message={"logging in"}
                />
              </span>
            )}
          </button>
        </div>
      </form>
      <div
        className="footerLinks--sigunupform"
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "flex-end",
        }}
      >
        <p
          style={{
            fontSize: "1rem",
            margin: "0",
            paddingRight: "1rem",
            width: "auto",
          }}
        >
          don't have an account?
          <Link style={{ fontSize: "1.0rem" }} to="/signup">
            signup
          </Link>
        </p>
      </div>
    </>
  );
}

function InputAnimated({
  register,
  errText = "error",
  inputAutoComplete = "off",
  inputID = "username",
  inputLabelText = "Username",
  inputType = "text",
  isDirty = "false",
  isErr = "false",
}) {
  return (
    <>
      <div className="input">
        {isDirty ? (
          <label className="isDirty" htmlFor={inputID}>
            {inputLabelText}
          </label>
        ) : (
          <label htmlFor={inputID}>{inputLabelText}</label>
        )}
        <input
          autoComplete={inputAutoComplete}
          type={inputType}
          name={inputID}
          id={inputID}
          ref={register}
          style={{ textAlign: "end" }}
        />
        {!!isErr ? <p>{errText}</p> : null}
      </div>
    </>
  );
}
