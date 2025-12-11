import React from 'react';

const WorkoutCard = ({ workout, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{workout.name}</h3>
      
      {workout.description && (
        <p className="text-gray-600 text-sm mb-4">{workout.description}</p>
      )}

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Exercises ({workout.exercises?.length || 0})</h4>
        <div className="space-y-2">
          {workout.exercises?.map((exercise, index) => (
            <div key={index} className="text-sm text-gray-600 flex justify-between items-center">
              <span className="font-medium">{exercise.name}</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {exercise.sets} sets × {exercise.reps} reps
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button
          onClick={onEdit}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(workout._id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
