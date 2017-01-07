import React from 'react';
import classNames from 'classnames';

import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

export default function Stats({deck, currentIndex}) {
  return <Paper
            className="stats"
            zDepth={1}
         >
          {
            deck.cards.map((card, index) => {
              return <Chip
                        className={classNames(
                            'chip',
                            {'chip--selected': index === currentIndex}
                        )}
                        key={card.q}
                      >
                        <Avatar>0%</Avatar>
                        <span title={card.a}>
                          {card.q}
                        </span>
                    </Chip>
            })
          }
        </Paper>
}
