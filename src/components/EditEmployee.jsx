import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state;

  const [formData, setFormData] = useState({
    id: employee.id,
    image: employee.image,
    name: employee.name,
    email: employee.email,
    role: employee.role,
    gender: employee.gender,
    phone: employee.phone,
    designation: employee.designation,
    department: employee.department,
    salary: employee.salary,
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Update logic (send back to admin page)
  const handleUpdate = () => {
    console.log('Updated Employee:', formData);
    navigate('/admin', { state: { updatedEmployee: formData } });
  };

  return (
    <div className="container mt-5">
      <h2>Edit Employee</h2>
      <form>
        {/* ✅ Image Upload */}
        <div className="mb-3">
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control" />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 rounded"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          )}
        </div>

        {/* Other fields */}
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Role:</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Phone:</label>
          <input type="number" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Designation:</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Department:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="form-control" />
        </div>

        <button type="button" className="btn btn-success" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;
