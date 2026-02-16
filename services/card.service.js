/**
 * Card business logic and pagination.
 */

const cardModel = require('../models/card.model');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

function getPaginatedCards(page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) {
  const all = cardModel.getAll();
  const totalCards = all.length;
  const totalPages = Math.max(1, Math.ceil(totalCards / limit));
  const p = Math.max(1, Number(page) || DEFAULT_PAGE);
  const l = Math.max(1, Math.min(100, Number(limit) || DEFAULT_LIMIT));
  const start = (p - 1) * l;
  const cards = all.slice(start, start + l);

  const next = p < totalPages ? { page: p + 1, limit: l } : null;
  const previous = p > 1 ? { page: p - 1, limit: l } : null;

  return {
    totalCards,
    totalPages,
    currentPage: p,
    limit: l,
    cards,
    next,
    previous,
  };
}

function getCardById(id) {
  return cardModel.getById(id);
}

function createCard(body) {
  return cardModel.create(body);
}

function updateCard(id, body) {
  return cardModel.update(id, body);
}

function deleteCard(id) {
  return cardModel.remove(id);
}

module.exports = {
  getPaginatedCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
};
