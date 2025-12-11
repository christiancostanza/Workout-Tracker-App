import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutService } from '../services/api';

const AddWorkout = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Add New Workout</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Workout Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Upper Body Day"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any notes about this workout..."
              rows="3"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Exercises</h2>
            
            {formData.exercises.map((exercise, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Exercise Name</label>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Bench Press"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Sets</label>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                      required
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Reps</label>
                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                      required
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="10"
                    />
                  </div>
                </div>
                
                {formData.exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExerciseField(index)}
                    className="text-red-500 hover:text-red-700 font-semibold text-sm"
                  >
                    Remove Exercise
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addExerciseField}
              className="text-blue-500 hover:text-blue-700 font-semibold text-sm mb-4"
            >
              + Add Another Exercise
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Creating Workout...' : 'Create Workout'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkout;
