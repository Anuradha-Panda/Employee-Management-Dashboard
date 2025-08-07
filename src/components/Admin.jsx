import React, { useState, useEffect } from 'react';
import users from '../data/users.json';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminEmail = "admin@example.com";

  const user = users.find(u => u.email === adminEmail && u.role === 'admin');
  const initialEmployees = users.filter(u => u.role !== 'admin');
  const [employeeUsers, setEmployeeUsers] = useState(initialEmployees);

  useEffect(() => {
    const updatedEmployee = location.state?.updatedEmployee;
    if (updatedEmployee) {
      const updatedList = employeeUsers.map(emp =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );
      setEmployeeUsers(updatedList);
    }
  }, [location.state]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleEdit = (id) => {
    const emp = employeeUsers.find(u => u.id === id);
    navigate(`/edit/${id}`, { state: { employee: emp } });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      const filteredList = employeeUsers.filter(emp => emp.id !== id);
      setEmployeeUsers(filteredList);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <div className="text-center mb-3">
          <img
            src={user?.image}
            alt="Admin"
            className="rounded-circle mb-2"
            width="100"
            height="100"
          />
          <h5>{user?.name}</h5>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><span className="nav-link text-white">Dashboard</span></li>
          <li className="nav-item mb-2"><span className="nav-link text-white">Manage Users</span></li>
          <li className="nav-item mb-2"><span className="nav-link text-white">Reports</span></li>
          <li className="nav-item mb-2"><span className="nav-link text-white">Settings</span></li>
          <li className="nav-item mt-4">
            <button onClick={handleLogout} className="btn btn-outline-light w-100">Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-light shadow-sm px-4 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* <img src="https://via.placeholder.com/40x40" alt="Logo" className="me-2" style={{ borderRadius: '50%' }} /> */}
            <span className="navbar-brand mb-0 h1">Admin Dashboard</span>
          </div>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </nav>

        <div className="container mt-4">
          {/* Admin Info */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Name</h5>
                  <p className="card-text">{user?.name}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Email</h5>
                  <p className="card-text">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Role</h5>
                  <p className="card-text">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Table */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">All Users</h5>
              <div className="table-responsive">
                <table className="table table-striped table-bordered mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Phone</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Salary</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeUsers.map((u, index) => (
                      <tr key={index}>
                        <td><img src={u.image} alt="user" width="50" height="50" className="rounded-circle" /></td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.gender}</td>
                        <td>{u.phone}</td>
                        <td>{u.designation}</td>
                        <td>{u.department}</td>
                        <td>₹{u.salary}</td>
                        <td>
                          <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(u.id)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {employeeUsers.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center">No users available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
