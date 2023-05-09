import React, { useState, useEffect } from "react";
import { login } from "../../redux/actions/index.js";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import axios from "axios";
import logo from "../../images/logo.png";
import bgImage from "../../images/tallNightSky.png";
import { useFetchImg } from "../../utils/hooks/useFetchImg";
import "./login.modules.css";

const pageWidth = window.innerWidth;
const isMobile = pageWidth < 401;
const isTablet = pageWidth > 401 && pageWidth < 881;
console.log({ pageWidth, isMobile, isTablet });

const left = (showForm) => ({
  display: "flex",
  width: showForm ? (isMobile ? "100%" : "50%") : "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${bgImage})`,
  color: "#ffffff",
  transition: "all .5s ease 0s, width 1.5s ease 0s, transform 1.5s ease 0s",
  zIndex: 3,
});

const right = (showForm) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: isMobile ? "100vw" : "50%",
  height: "100%",
  boxShadow: "-1px 0px 5px .2px black",
  transition: "all .5s ease, width 1.5s ease, transform 1.5s ease ",
  transform: isMobile
    ? showForm
      ? "translate3d(0,0,0)"
      : "translate3d(-100%,0,0)"
    : showForm
    ? "translate3d(100%,0,0)"
    : "translate3d(0%,0,0)",

  zIndex: isMobile ? 3 : showForm ? 1 : 1,
  position: "absolute",
});

function Login(props) {
  const [showForm, setShowForm] = useState(false);
  const welcomeHeaderRef = React.useRef();
  function handleOpenForm() {
    // if (showForm) {
    //   welcomeHeaderRef.current.style.transform = "translateY(-10px)";
    //   welcomeHeaderRef.current.style.transition = "all 3.5s ease 0s";
    //   welcomeHeaderRef.current.style.textAlign = "center";
    // } else {
    //   welcomeHeaderRef.current.style.transform = "translateY(10px)";
    //   welcomeHeaderRef.current.style.transition = "all 3.5s ease 0s";
    //   welcomeHeaderRef.current.style.textAlign = "center";
    // }
    setShowForm(!showForm);
  }
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        padding: "0",
        border: " #f50057 solid .5rem",
        fontSize: "4rem",
        position: "relative",
      }}
    >
      <Logo handleOpenForm={handleOpenForm} />
      <div style={left(showForm)}>
        <span>showForm:{showForm ? "YES" : "NOPE"}</span>
      </div>
      <div className="half right form authform" style={right(showForm)}>
        <LoginForm
          showForm={showForm}
          login={props.login}
          isLoading={props.isLoading}
          welcomeHeaderRef={welcomeHeaderRef}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { isLoading: state.isLoading };
}

export default connect(mapStateToProps, { login })(Login);

function Logo({ handleOpenForm }) {
  return (
    <img
      onClick={handleOpenForm}
      src={logo}
      style={{
        zIndex: 10,
        position: "absolute",
        top: 100,
        left: isMobile ? "calc(50% - 115px/2)" : "calc(25% - 115px/2)",
        height: 115,
        width: 115,
        borderRadius: 100,
        opacity: 0.65,
        boxShadow: `0px 0px 10px 100px #ffffcc1c`,
        // translate: "2vmin 20vmin",
      }}
    />
  );
}
