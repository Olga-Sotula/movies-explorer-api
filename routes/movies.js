const express = require('express');

const movieRouter = express.Router();
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { createMovieValidator, idValidator } = require('../middlewares/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidator, createMovie);
movieRouter.delete('/:id', idValidator, deleteMovieById);

module.exports = {
  movieRouter,
};
