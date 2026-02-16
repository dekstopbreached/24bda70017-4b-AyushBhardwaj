/**
 * In-memory card store.
 * Uses a simple array; each card has id, suit, value, collection.
 */

const cards = [
  {
    id: 171836785992,
    suit: 'diamonds',
    value: 'queen',
    collection: 'royal',
  },
];

let nextId = 171836785993;

function getAll() {
  return [...cards];
}

function getById(id) {
  const numId = Number(id);
  return cards.find((c) => c.id === numId);
}

function create(card) {
  const newCard = {
    id: nextId++,
    suit: card.suit ?? '',
    value: card.value ?? '',
    collection: card.collection ?? '',
  };
  cards.push(newCard);
  return newCard;
}

function update(id, updates) {
  const numId = Number(id);
  const index = cards.findIndex((c) => c.id === numId);
  if (index === -1) return null;
  const updated = { ...cards[index], ...updates, id: numId };
  cards[index] = updated;
  return updated;
}

function remove(id) {
  const numId = Number(id);
  const index = cards.findIndex((c) => c.id === numId);
  if (index === -1) return false;
  cards.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
