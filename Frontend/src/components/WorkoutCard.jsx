import React from 'react';

const WorkoutCard = ({ workout, onEdit, onDelete }) => {
  return (
    <div className="card bg-white rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-xl transition">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 px-6 py-6 border-b border-purple-200">
        <h3 className="text-2xl font-bold text-gray-900">{workout.name}</h3>
        {workout.description && (
          <p className="text-gray-700 text-sm mt-2 line-clamp-2">{workout.description}</p>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 px-6 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900">Exercises</h4>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
              {workout.exercises?.length || 0}
            </span>
          </div>
          <div className="space-y-3">
            {workout.exercises?.map((exercise, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{exercise.name}</p>
                  </div>
                  <span className="badge ml-3">
                    {exercise.sets}×{exercise.reps}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-5 flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 btn-primary text-white py-2 rounded-lg font-semibold text-sm transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(workout._id)}
          className="flex-1 btn-danger text-white py-2 rounded-lg font-semibold text-sm transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
