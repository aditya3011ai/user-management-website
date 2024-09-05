import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching users");
        setLoading(false);
      });
  }, []);
  const deleteUser = (user) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${user}`)
      .then(() => {
        alert("User deleted successfully");
      })
      .catch((error) => {
        setError("Error deleting user");
      });
  };
  if (loading) return <div className="loader"></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="main">
      <div className="Header">
        <h1>User List</h1>
        <div className="adduser-container">
          <Link to={"/adduser"}>
            <button className="adduserbutton">Add User</button>
          </Link>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <div>
                  <Link to={`/users/${user.id}`} >
                    <button className="tablebutton">Edit</button>
                  </Link>

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
