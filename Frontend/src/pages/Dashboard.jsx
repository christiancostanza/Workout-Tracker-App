import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { workoutService } from '../services/api';
import WorkoutCard from '../components/WorkoutCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await workoutService.getWorkouts();
      setWorkouts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load workouts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteWorkout = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await workoutService.deleteWorkout(id);
        setWorkouts(workouts.filter((w) => w._id !== id));
      } catch (err) {
        setError('Failed to delete workout.');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#2c3e50', color: '#ffffff', padding: '2rem 0', borderBottom: '1px solid #34495e' }}>
        <div className="container-centered">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 style={{ color: '#ffffff', margin: 0, fontSize: '2rem', fontWeight: '700' }}>Workout Tracker</h1>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div style={{ textAlign: 'right', color: '#bdc3c7' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Welcome back, {user?.name}</div>
              </div>
              <button onClick={() => navigate('/account')} className="btn btn-light">Account</button>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: '#f8f9fa', padding: '3rem 0' }}>
        <div className="container-centered">
          {error && (
            <div className="alert alert-danger mb-4">
              {error}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 style={{ color: '#2c3e50', fontSize: '2rem', fontWeight: '700', margin: 0 }}>Your Workouts</h2>
              <p style={{ color: '#555', margin: '0.5rem 0 0 0' }}>Create and manage your fitness routines</p>
            </div>
            <button
              onClick={() => navigate('/add-workout')}
              className="btn btn-primary"
            >
              + New Workout
            </button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3" style={{ color: '#555' }}>Loading your workouts...</p>
            </div>
          ) : workouts.length === 0 ? (
            <div className="card text-center py-5" style={{ borderColor: '#ddd' }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#2c3e50' }}>No workouts yet</h5>
                <p className="card-text" style={{ color: '#555' }}>Create your first workout to get started</p>
                <button
                  onClick={() => navigate('/add-workout')}
                  className="btn btn-primary"
                >
                  Create Workout
                </button>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {workouts.map((workout) => (
                <div key={workout._id} className="col-12 col-md-6 col-lg-4">
                  <WorkoutCard
                    workout={workout}
                    onEdit={() => navigate(`/edit-workout/${workout._id}`)}
                    onDelete={handleDeleteWorkout}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
