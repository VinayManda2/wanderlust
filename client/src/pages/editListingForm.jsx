import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { setItem } from "../redux/itemSlice"; // Ensure the path is correct

const EditListingForm = () => {
  const { id } = useParams(); // Get listing ID from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the listing from Redux store using useSelector
  const initialListing = useSelector((state) => state.item);

  // State variables to manage form data
  const [formData, setFormData] = useState({
    title: initialListing.title || "",
    description: initialListing.description || "",
    price: initialListing.price || 0,
    country: initialListing.country || "",
    location: initialListing.location || "",
  });

  const [file, setFile] = useState(initialListing.image); // File state for image upload

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("file", file);

    // Log FormData entries before sending to the server

    try {
      const response = await axios.put(
        `http://localhost:8080/api/listings/${id}`,
        formDataToSend
      );

      // Update the item in Redux store after successful edit
      dispatch(
        setItem({
          _id: initialListing._id,
          title: formData.title,
          description: formData.description,
          price: formData.price,
          country: formData.country,
          location: formData.location,
          image: {
            url: response.data.image.url, // Update imageUrl from response
            filename: response.data.image.filename, // Update imageName from response
          },
          ownerUsername: initialListing.ownerUsername, // Retain ownerUsername from existing state
          ownerId: initialListing.ownerId, // Retain ownerId from existing state
        })
      );

      // Optionally, redirect or perform other actions upon successful edit
      navigate(`/api/listings/${id}`);
    } catch (error) {
      console.error("Error editing listing:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="row mt-3">
      <div className="col-8 offset-2">
        <h3>Edit your Listing</h3>
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Current Listing Image</label> <br />
            {file.url && (
              <img
                src={file.url}
                alt="Current Listing"
                style={{ height: "200px" }}
              />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload New Image
            </label>
            <input
              name="image"
              type="file"
              className="form-control"
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
                value={formData.price}
                onChange={handleChange}
                type="number"
                className="form-control"
              />
            </div>
            <div className="mb-3 col-md-8">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-dark edit-btn mt-3">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListingForm;
