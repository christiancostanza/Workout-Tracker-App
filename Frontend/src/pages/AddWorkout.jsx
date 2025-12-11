import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AddWorkout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    exercises: [{ name: '', sets: '', reps: '' }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...formData.exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setFormData((prev) => ({ ...prev, exercises: newExercises }));
  };

  const addExerciseField = () => {
    setFormData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', sets: '', reps: '' }],
    }));
  };

  const removeExerciseField = (index) => {
    setFormData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await workoutService.createWorkout(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header (match Dashboard) */}
      <header style={{ backgroundColor: '#2c3e50', color: '#ffffff', padding: '1.5rem 0', borderBottom: '1px solid #34495e' }}>
        <div className="container-centered d-flex justify-content-between align-items-center">
          <div>
            <h1 style={{ color: '#ffffff', margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Add New Workout</h1>
            <p style={{ color: '#bdc3c7', margin: '0.4rem 0 0 0', fontSize: '0.9rem' }}>Create a new workout routine</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div style={{ textAlign: 'right', color: '#bdc3c7' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Welcome back, {user?.name}</div>
            </div>
            <button onClick={() => navigate('/account')} className="btn btn-light">Account</button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">Close</button>
            <button onClick={() => { /* optional: keep local close */ navigate('/dashboard'); }} className="btn btn-danger d-none" aria-hidden="true">Logout</button>
          </div>
        </div>
      </header>
      <div className="container-centered" style={{ padding: '2rem 1rem' }}>
        <div className="card">
          <div className="card-body">

          {error && (
            <div className="alert alert-danger mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Workout Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="e.g., Upper Body Day"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Add any notes about this workout..."
                rows="3"
              />
              <small style={{ color: '#555' }}>Optional - helps you remember what this workout is for</small>
            </div>

            <div className="mb-10">
              <div className="mb-3">
                <h3 style={{ color: '#2c3e50', fontWeight: '600', fontSize: '1.25rem' }}>Exercises</h3>
                <p style={{ color: '#555', marginTop: '0.5rem' }}>Add the exercises for this workout</p>
              </div>
              
              {formData.exercises.map((exercise, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                  <div className="row g-3 mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Exercise Name</label>
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                        required
                        className="form-control"
                        placeholder="e.g., Bench Press"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Sets</label>
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                        required
                        min="1"
                        className="form-control"
                        placeholder="3"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Reps</label>
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                        required
                        min="1"
                        className="form-control"
                        placeholder="10"
                      />
                    </div>
                  </div>
                  
                  {formData.exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExerciseField(index)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove Exercise
                    </button>
                  )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addExerciseField}
                className="btn btn-secondary btn-sm mb-3"
              >
                + Add Another Exercise
              </button>
            </div>

            <div className="d-flex gap-2 mt-4 pt-3" style={{ borderTop: '1px solid #ddd' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-grow-1"
              >
                {loading ? 'Creating Workout...' : 'Create Workout'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn btn-secondary flex-grow-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddWorkout;
