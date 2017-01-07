import React from 'react';
import { deckName, findDeck, getDeckNames } from './lib/decks.js';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default function DeckSelector({
  decks,
  value,
  onDeckSelected
}) {
  return (
    <DropDownMenu
         value={value}
         onChange={onDeckSelected}
       >
        {
          getDeckNames(decks).map((name) => {
            const deck = findDeck(name, decks);
            return <MenuItem
                      key={name}
                      value={name}
                      primaryText={deckName(deck)}
                    />
            })
        }
    </DropDownMenu>
  )
}
