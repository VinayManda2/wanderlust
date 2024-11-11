import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import "./rating.css";
import { setItem } from "../redux/itemSlice"; // Ensure the path is correct
import { selectUser } from "../redux/authSlice"; // Ensure the path is correct

const DisplayDetails = () => {
  const params = useParams();
  const item = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const { userId: authUserId } = useSelector(selectUser); // Get user ID from Redux store

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1); // Default rating to 1 star

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/listings/${item._id}`);
      // Optionally, you can clear the item from the store after deletion
      dispatch(
        setItem({
          title: "",
          image: {
            url: "",
            filename: "",
          },
          ownerUsername: "",
          ownerId: "",
          description: "",
          price: 0,
          location: "",
          country: "",
        })
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your submit logic here
    console.log(`comment ${comment} and rating ${rating}`);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Optionally, perform additional actions after successful deletion
        console.log(`Review ${reviewId} deleted successfully`);
      } else {
        console.error("Delete review failed:", response.statusText);
      }
    } catch (error) {
      console.error("Delete review failed:", error.message);
    }
  };

  if (!item.title) return <div>Loading...</div>;

  return (
    <div className="row mt-3 ">
      <div className="col-8 offset-3">
        <h5 className="card-title">{item.title}</h5>
      </div>

      <div className="card col-6 offset-3 show-card listing-card">
        <img
          src={item.image.url} // Use the image URL from the image object
          className="card-img-top show-img"
          alt={item.image.filename} // Use the image filename as the alt text
        />
        <div className="card-body">
          <h5 className="card-title">Owned by {item.ownerUsername}</h5>
          <p className="card-text mt-2">{item.description}</p>
          <p className="card-text">
            &#8377; {item.price.toLocaleString("en-IN")}
          </p>
          <p className="card-text">{item.location}</p>
          <p className="card-text">{item.country}</p>
        </div>
      </div>

      {authUserId && authUserId === item.ownerId && (
        <div className="btns">
          <Link
            to={`/api/listings/${params.id}/edit`}
            className="btn btn-dark col-1 offset-3 edit-btn"
          >
            Edit
          </Link>

          <button onClick={handleDelete} className="btn btn-dark offset-5">
            Delete
          </button>
        </div>
      )}

      <div className="col-8 offset-2">
        {authUserId && (
          <>
            <hr />
            <h4>Leave a review</h4>
            <form
              className="mb-3 needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="mt-3 mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <fieldset className="starability-slot">
                  <input
                    type="radio"
                    id="no-rate"
                    className="input-no-rate"
                    name="review[rating]"
                    value="0"
                    checked={rating === 0}
                    onChange={handleRatingChange}
                    aria-label="No rating."
                  />
                  <input
                    type="radio"
                    id="first-rate1"
                    name="review[rating]"
                    value="1"
                    checked={rating === 1}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate1" title="Terrible">
                    1 star
                  </label>
                  <input
                    type="radio"
                    id="first-rate2"
                    name="review[rating]"
                    value="2"
                    checked={rating === 2}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate2" title="Not good">
                    2 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate3"
                    name="review[rating]"
                    value="3"
                    checked={rating === 3}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate3" title="Average">
                    3 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate4"
                    name="review[rating]"
                    value="4"
                    checked={rating === 4}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate4" title="Very good">
                    4 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate5"
                    name="review[rating]"
                    value="5"
                    checked={rating === 5}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate5" title="Amazing">
                    5 stars
                  </label>
                </fieldset>
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  Comments
                </label>
                <textarea
                  name="review[comment]"
                  id="comment"
                  cols="30"
                  rows="5"
                  className="form-control"
                  required
                  onChange={handleCommentChange}
                ></textarea>
                <div className="invalid-feedback">
                  Please add some comments for review
                </div>
              </div>
              <button className="btn btn-outline-dark">Submit</button>
            </form>
          </>
        )}

        <hr />
        <h4>All reviews</h4>
        <div className="row">
          {item.reviews &&
            item.reviews.map((review) => (
              <div key={review._id} className="card col-5 ms-3 mb-3">
                <div className="card-body">
                  <h5 className="card-title">@{review.author.username}</h5>

                  <p className="card-text">{review.comment}</p>
                  {authUserId && authUserId === review.author._id && (
                    <form
                      onSubmit={() => handleDeleteReview(review._id)}
                      className="mb-3"
                    >
                      <button type="submit" className="btn btn-sm btn-dark">
                        Delete
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayDetails;
