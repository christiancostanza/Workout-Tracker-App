import express from 'express';
import Workout from '../models/Workout.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/workouts - get all workouts for user
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/workouts - create workout
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, exercises } = req.body;
    if (!name || !Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({ message: 'Name and at least one exercise are required' });
    }

    const workout = await Workout.create({ user: req.user.id, name, description, exercises });
    res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/workouts/:id - update workout
router.put('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    if (workout.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    const { name, description, exercises } = req.body;
    workout.name = name ?? workout.name;
    workout.description = description ?? workout.description;
    if (Array.isArray(exercises)) workout.exercises = exercises;

    await workout.save();
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/workouts/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    if (workout.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await workout.remove();
    res.json({ message: 'Workout removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
