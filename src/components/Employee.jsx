import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load logged-in employee data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === 'employee') {
        setUser(parsedUser);
      } else {
        navigate('/'); // Redirect if not employee
      }
    } else {
      navigate('/'); // Redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return null; // Optional loading fallback

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <div className="text-center mb-4">
          <img
            src={user.image}
            alt="Profile"
            className="rounded-circle"
            width="100"
            height="100"
          />
          <h5 className="mt-2">{user.name}</h5>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <span className="nav-link text-white">🏠 Dashboard</span>
          </li>
          <li className="nav-item mb-2">
            <span className="nav-link text-white">📄 Profile</span>
          </li>
          <li className="nav-item mb-2">
            <span className="nav-link text-white">📊 Tasks</span>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <span className="navbar-brand">Employee Portal</span>
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger ms-auto"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Content */}
        <div className="container mt-4">
          <h3>Welcome, {user.name} 👋</h3>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Personal Info</h5>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Gender:</strong> {user.gender}</p>
                  <p><strong>Address:</strong> {user.address}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Professional Info</h5>
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Designation:</strong> {user.designation}</p>
                  <p><strong>Department:</strong> {user.department}</p>
                  <p><strong>Salary:</strong> ₹{user.salary.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            {/* <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '300px' }}
              alt="Office Banner"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
