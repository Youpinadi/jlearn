import R from 'ramda';

export function deckName(deck) {
  return `${deck.name} (${deck.cards.length} cards)`
}

export function getDeckNames(decks) {
  return decks.map((deck) => deck.name);
}

export function findDeck(name, decks) {
  return R.pipe(
    R.filter(R.propEq('name', name)),
    R.head
  )(decks);
}
