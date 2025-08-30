const router = require('express').Router();
const Movie = require('../models/Movie');

// GET ALL MOVIES
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET RANDOM MOVIE OR SERIES
router.get('/random', async (req, res) => {
  const type = req.query.type;
  let movie;
  
  try {
    if (type === 'series') {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MOVIE BY ID
router.get('/find/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MOVIES BY CATEGORY
router.get('/category/:category', async (req, res) => {
  try {
    const movies = await Movie.find({ 
      genre: { $regex: new RegExp(req.params.category, 'i') } 
    });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SEARCH MOVIES
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { desc: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CATEGORIES
router.get('/categories', async (req, res) => {
  try {
    const categories = await Movie.distinct('genre');
    res.status(200).json(categories.filter(category => category)); // Remove null/empty categories
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE NEW MOVIE (Admin only)
router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE MOVIE
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE MOVIE
router.delete('/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json('Movie has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;