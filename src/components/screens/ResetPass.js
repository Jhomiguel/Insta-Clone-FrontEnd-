import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
const ResetPass = () => {
  const history = useHistory();
  const [userdata, setUserData] = useState({
    email: "",
  });
  const { email } = userdata;

  const handleChange = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const postData = () => {
    fetch("/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          M.toast({ html: data.msg, classes: "#00c853 green accent-4" });
          history.push("/signin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <h4>Reset Password</h4>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <button
          className="btn waves-effect waves-light #1e88e5 blue darken-1 btn-lg"
          type="submit"
          onClick={postData}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default ResetPass;
