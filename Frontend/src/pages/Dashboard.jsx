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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Workout Tracker</h1>
            <p className="text-blue-100">Welcome, {user?.name}!</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/account')}
              className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition"
            >
              Account Settings
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Workouts</h2>
          <button
            onClick={() => navigate('/add-workout')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            + Add Workout
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading your workouts...</div>
          </div>
        ) : workouts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No workouts yet. Start your fitness journey!</p>
            <button
              onClick={() => navigate('/add-workout')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Add Your First Workout
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
                onDelete={handleDeleteWorkout}
                onEdit={() => navigate(`/edit-workout/${workout._id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
