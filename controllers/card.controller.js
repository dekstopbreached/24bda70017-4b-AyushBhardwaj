/**
 * Card HTTP request/response handling and basic validation.
 */

const cardService = require('../services/card.service');

function listCards(req, res) {
  const page = req.query.page;
  const limit = req.query.limit;
  const result = cardService.getPaginatedCards(page, limit);
  res.json(result);
}

function getCard(req, res) {
  const card = cardService.getCardById(req.params.id);
  if (!card) {
    return res.status(404).json({ error: 'Card not found' });
  }
  res.json(card);
}

function createCard(req, res) {
  const { suit, value, collection } = req.body || {};
  if (!suit || !value || !collection) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['suit', 'value', 'collection'],
    });
  }
  const card = cardService.createCard({ suit, value, collection });
  res.status(201).json(card);
}

function updateCard(req, res) {
  const existing = cardService.getCardById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Card not found' });
  }
  const updated = cardService.updateCard(req.params.id, req.body || {});
  res.json(updated);
}

function deleteCard(req, res) {
  const removed = cardService.deleteCard(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: 'Card not found' });
  }
  res.status(204).send();
}

module.exports = {
  listCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
};
