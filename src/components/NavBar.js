import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const NavBar = () => {
  const { state, dispatch } = useContext(userContext);
  const [uName, setuName] = useState("");
  const [usersinfo, setUsersInfo] = useState([]);
  const history = useHistory();
  const searchModal = useRef(null);

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const searchUsers = (query) => {
    setuName(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsersInfo(data);
      });
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-Linknd-down">
          {state ? (
            <>
              <li>
                <i
                  className="material-icons modal-trigger"
                  data-target="modal1"
                  style={{ color: "black" }}
                >
                  search
                </i>
              </li>
              <li>
                <Link to="/allposts">All Posts</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/createpost">Make a post</Link>
              </li>
              <li>
                <button
                  className="btn waves-effect waves-light #f44336 red"
                  type="submit"
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "LOGOUT" });
                    history.push("/signin");
                    M.toast({
                      html: "Cya later",
                      classes: "#d32f2f red darken-2",
                    });
                  }}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <h5>Searh Users</h5>
          <input
            type="text"
            placeholder="Search User"
            name="uName"
            value={uName}
            onChange={(e) => searchUsers(e.target.value)}
          />
          <div className="collection">
            {usersinfo
              ? usersinfo.map((user) => (
                  <Link
                    key={user._id}
                    to={
                      user._id != state._id
                        ? `/profile/${user._id}`
                        : "/profile"
                    }
                    className="collection-item"
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      searchUsers("");
                    }}
                  >
                    {user.name}
                  </Link>
                ))
              : "user not found"}
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-close waves-effect waves-red btn-flat">
            Close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
