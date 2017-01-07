import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import hiragana from './decks/hiragana.js';
import katakana from './decks/katakana.js';
import capitals from './decks/capitals.js';
import basicFrench from './decks/basic-french.js';

import RaisedButton from 'material-ui/RaisedButton';


import DeckSelector from './DeckSelector.js';
import Stats from './Stats.js';

import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { findDeck } from './lib/decks.js';


import './App.css';

const decks = [
  hiragana,
  katakana,
  capitals,
  basicFrench
];

function Card({value}) {
  return <Paper
            className="card"
            zDepth={1}
         >
          {value}
        </Paper>
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      random: false,
      consecutiveGoodAnswers: 0,
      currentIndex: 0,
      previousCard: null,
      flipped: false,
      repeatLastCard: false,
      input: '',
      inputClass: '',
      decks: decks,
      deck: decks[0],
      hint: '',
      userData: {}
    }
    this.handleDeckSelected = this.handleDeckSelected.bind(this);
    this.nextCard = this.nextCard.bind(this)
  }

  handleDeckSelected(event, index, value) {
    this.setState({
      deck: findDeck(value, decks)
    });
    var eventClick = new Event('click');
    ReactDOM.findDOMNode(this.answer1).dispatchEvent(eventClick);

  }

  nextCard() {
    let currentIndex;
    if (this.state.random) {
        currentIndex = Math.floor(Math.random() * this.state.deck.cards.length);
    } else {
        const nextIndex = this.state.currentIndex + 1;
        currentIndex = nextIndex <= this.state.deck.cards.length - 1 ? nextIndex : 0;
    }
    console.log(currentIndex)
    this.setState({currentIndex});
  }

  render() {
    const deck = this.state.deck;
    const currentCard = deck.cards[this.state.currentIndex];
    console.log(this.state.deck, currentCard);

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="JLEARN"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div className="button-container">
            <DeckSelector
              className="selector"
              decks={decks}
              value={this.state.deck.name}
              onDeckSelected={this.handleDeckSelected}
            />
            <Toggle
               className="toggle"
               label="Random mode"
               defaultToggled={true}
             />
            <Card value="question" value={currentCard.q}/>
            <Card value="answer" value={currentCard.a}/>

            <RaisedButton className="answer-button" label="answer 1 (v)"/>
            <RaisedButton className="answer-button" label="answer 2 (b)"/>
            <RaisedButton className="answer-button" label="answer 3 (n)"/>
            <RaisedButton
              className="learn"
              label="learn (space)"
              onClick={this.nextCard}
            />
            <Stats deck={deck} currentIndex={this.state.currentIndex}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
