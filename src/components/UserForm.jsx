import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const UserForm = ({}) => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const { id } = useParams();
  const [userId, setuserId] = useState(id);
  const [isEditing, setIsEditing] = useState(userId ? true : false);

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => setUser(response.data));
    }
  }, [userId, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? "put" : "post";
    const url = isEditing
      ? `https://jsonplaceholder.typicode.com/users/${userId}`
      : "https://jsonplaceholder.typicode.com/users";

    axios[method](url, user)
      .then((response) => {
        alert(isEditing ? "User updated" : "User created");
      })
      .catch(() => alert("Error occurred"));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div >
        <h2>{isEditing ? "Update" : "Create"} User</h2>
      </div>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <button type="submit">{isEditing ? "Update" : "Create"}</button>
      <Link to={"/"}>
        <button className="backbutton" >Back</button>
      </Link>
    </form>
  );
};

export default UserForm;
