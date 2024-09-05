import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const UserForm = () => {
  // State to hold the form data for the user (name, email, phone)
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  // useParams hook to extract the user ID from the URL if editing an existing user
  const { id } = useParams();
  
  // Set the userId based on the URL parameter
  const [userId, setuserId] = useState(id);

  // Determines if the form is in 'edit' mode (true) or 'create' mode (false)
  const [isEditing, setIsEditing] = useState(userId ? true : false);

  // useEffect hook to fetch user data when editing an existing user
  useEffect(() => {
    if (isEditing) {
      // Make a GET request to retrieve the existing user's data from the API
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => setUser(response.data)); // Set the user data in the state
    }
  }, [userId, isEditing]); // Dependencies: the effect runs when userId or isEditing changes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Choose method and URL based on whether the form is for editing or creating
    const method = isEditing ? "put" : "post"; // PUT for update, POST for create
    const url = isEditing
      ? `https://jsonplaceholder.typicode.com/users/${userId}` // Update the existing user
      : "https://jsonplaceholder.typicode.com/users"; // Create a new user

    // Make the API request using axios
    axios[method](url, user)
      .then((response) => {
        // Display an alert to confirm if the user was created or updated successfully
        alert(isEditing ? "User updated" : "User created");
      })
      .catch(() => alert("Error occurred")); // Handle errors
  };

  // Handle changes to the form fields and update the state accordingly
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value }); // Update user state with new input values
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>{isEditing ? "Update" : "Create"} User</h2> {/* Show either "Create" or "Update" based on the form mode */}
      </div>
      
      {/* Input field for user's name */}
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      
      {/* Input field for user's email */}
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      
      {/* Input field for user's phone */}
      <input
        type="tel"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      
      {/* Submit button: text changes depending on whether user is being created or updated */}
      <button type="submit">{isEditing ? "Update" : "Create"}</button>
      
      {/* Back button that links back to the main user list (homepage) */}
      <Link to={"/"}>
        <button className="backbutton">Back</button>
      </Link>
    </form>
  );
};

export default UserForm;
