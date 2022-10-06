const Movie = require('../models/movie');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');
const { ErrorNotFound } = require('../errors/ErrorNotFound');
const { ErrorForbidden } = require('../errors/ErrorForbidden');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  /*const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(ErrorBadRequest('Ошибка данных в запросе'));
      } else {
        next(e);
      }
    });*/
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => new ErrorNotFound('Фильм не найден'))
    .then((movie) => {
      /*if (!card.owner.equals(req.user._id)) {
        throw new ErrorForbidden('Отсутствуют права на удаление карточки');
      } else {*/
        return Movie.findByIdAndDelete(req.params.id);
      //}
    })
    .then((deletedMovie) => res.send({ data: deletedMovie }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(e);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
