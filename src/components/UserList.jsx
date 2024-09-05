import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  
  // State to handle loading indicator while data is being fetched
  const [loading, setLoading] = useState(true);
  
  // State to store any errors that occur during the API requests
  const [error, setError] = useState(null);

  // useEffect hook to fetch the list of users when the component mounts
  useEffect(() => {
    // Make a GET request to fetch the users from the API
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data); // Set the fetched users into the state
        setLoading(false); // Stop the loading spinner
      })
      .catch((error) => {
        setError("Error fetching users"); // Handle errors if the request fails
        setLoading(false); // Stop the loading spinner
      });
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Function to handle deleting a user
  const deleteUser = (userId) => {
    // Make a DELETE request to delete a user
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        alert("User deleted successfully"); // Alert the user after successful deletion
        // Optionally, you can remove the deleted user from the local state here
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch((error) => {
        setError("Error deleting user"); // Handle errors if the request fails
      });
  };

  // Show a loading spinner while the users are being fetched
  if (loading) return <div className="loader"></div>;
  
  // Show an error message if there was an issue fetching or deleting users
  if (error) return <div>{error}</div>;

  return (
    <div className="main">
      <div className="Header">
        <h1>User List</h1>
        {/* Link to the "Add User" form */}
        <div className="adduser-container">
          <Link to={"/adduser"}>
            <button className="adduserbutton">Add User</button>
          </Link>
        </div>
      </div>

      {/* Table to display the list of users */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th> {/* Column for edit and delete actions */}
          </tr>
        </thead>
        <tbody>
          {/* Loop through the list of users and display each user in a table row */}
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <div>
                  {/* Edit button to navigate to the user edit form */}
                  <Link to={`/users/${user.id}`}>
                    <button className="tablebutton">Edit</button>
                  </Link>

                  {/* Delete button to remove the user */}
                  <button
                    className="deletebutton tablebutton"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
