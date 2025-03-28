import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Pokemon logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/500px-International_Pok%C3%A9mon_logo.svg.png"
        className="nav__logo"
        onClick={() => navigate("/")}
      />

      <img
        alt="User logged"
        src="https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png"
        className="nav__avatar"
      />
    </nav>
  );
}

export default Nav;
