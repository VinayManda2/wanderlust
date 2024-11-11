import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="f-info">
        <div className="f-info-socials">
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-square-instagram"></i>
          <i className="fa-brands fa-linkedin"></i>
        </div>
        <div className="f-info-brand"> &copy; Wanderlust Private Limited</div>
        <div className="f-info-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
