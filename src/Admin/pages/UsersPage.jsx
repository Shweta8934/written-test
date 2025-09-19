import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/getAllUsers`);
        // Ensure users is always an array
        setUsers(Array.isArray(response.data.users) ? response.data.users : []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [API_URL]);

  // Filter users safely
  const filteredUsers = (users || []).filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.phone?.includes(search)
  );

  const handleUserClick = (uid) => {
    navigate(`/users/${uid}`);
  };

  return (
    <div className="users-page-container">
      <header className="page-header">
        <h1>User Directory</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <p className="loading-text">Loading user data...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.uid}>
                    <td
                      className=" clickable"
                      onClick={() => handleUserClick(user.uid)}
                    >
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      {user.createdAt?._seconds
                        ? new Date(
                            user.createdAt._seconds * 1000
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-results">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
