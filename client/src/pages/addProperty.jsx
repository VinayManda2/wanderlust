import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { selectUser } from "../redux/authSlice"; // Adjust the import path as necessary

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    country: "",
    location: "",
  });

  const [file, setFile] = useState();
  const userId = useSelector(selectUser); // Get user ID from Redux state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, price, country, location } = formData;
    console.log({
      title,
      description,
      price,
      country,
      location,
    });

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    if (!userId) {
      console.error("User ID not found in state");
      return;
    }
    // let id = userId.userId;
    // console.log(userId);
    // Create FormData object to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append("userId", userId.userId);
    formDataToSend.append("title", title);
    formDataToSend.append("description", description);
    formDataToSend.append("price", price);
    formDataToSend.append("country", country);
    formDataToSend.append("location", location);
    formDataToSend.append("file", file);

    // Log the FormData entries
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/listings/new",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      navigate(`/api/listings`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row add mt-4">
      <div className="col-8 offset-2">
        <h3>Create a New Listing</h3>
        <form
          method="POST"
          action="/listings"
          noValidate
          className="needs-validation"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              placeholder="Add title"
              type="text"
              className="form-control"
              required
              onChange={handleChange}
            />
            <div className="valid-feedback">Title Looks good!</div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input
              name="image"
              type="file"
              className="form-control"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                name="price"
                placeholder="Add price"
                type="number"
                className="form-control"
                required
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Please enter a valid price.
              </div>
            </div>

            <div className="mb-3 col-md-8">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                name="country"
                placeholder="Add country"
                type="text"
                className="form-control"
                required
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Please enter the country name.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              name="location"
              placeholder="Add location"
              type="text"
              required
              className="form-control"
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please enter a location.</div>
          </div>
          <br />
          <button className="btn btn-dark add-btn">Add</button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
