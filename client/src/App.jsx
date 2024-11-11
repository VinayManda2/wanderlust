import Properties from "./pages/properties";
import AddProperty from "./pages/addProperty";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import EditListingForm from "./pages/editListingForm";
import DisplayDetails from "./pages/displayDetails";
function App() {
  return (
    <Routes>
      <Route path="/api/listings" element={<Properties />} />
      <Route path="/api/listings/new" element={<AddProperty />} />
      <Route
        path="/api/listings/:id"
        element={<DisplayDetails />} // Pass props to PropertyDetails
      />
      <Route path="/api/listings/:id/edit" element={<EditListingForm />} />
      <Route path="/api/signup" element={<Signup />} />
      <Route path="/api/login" element={<Login />} />
    </Routes>
  );
}

export default App;
