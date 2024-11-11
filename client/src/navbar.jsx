import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "./redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove token from localStorage
        localStorage.removeItem("token");

        // Dispatch logout action to clear user data from Redux store
        dispatch(logout());
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-body-light border-bottom ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/api/listings">
          <i className="fa-regular fa-compass"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/api/listings">
              Explore
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <form className="d-flex">
              <input
                className="form-control me-2 rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-search rounded-pill border"
                type="submit"
              >
                <i className="fa-solid fa-magnifying-glass"></i> search
              </button>
            </form>
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/api/listings/new">
              Add New Listing
            </Link>
            {isAuthenticated ? (
              <button className="nav-link" onClick={handleLogout}>
                <b>Logout</b>
              </button>
            ) : (
              <Link className="nav-link" to="/api/login">
                <b>Login</b>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
