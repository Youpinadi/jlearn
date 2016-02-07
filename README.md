JLearn - Learn anything
======

JLearn is an easy and efficient flashcard system for learning.
No need to press enter or use your mouse, just type an answer (or press space if you're unsure).

Jlearn is built on AngularJS.
It's easy to add new flashcard decks, just create a file with an array containing the cards.

Here's a sample deck:

```javascript
decks.push(
{
    name: 'Hiragana alphabet',
    description: 'Learn the Hiragana alphabet',
    fuzzy: true, // optional, if defined, the student will be able to toggle the fuzzy option
    cards: [
         {source: 'あ', target: 'a', 'hint' : 'the first letter of the alphabet'}, // you can add custom hint, if you don't, first letter will be given as a hint
         {source: 'か', target: 'ka'},
         {source: 'さ', target: 'sa'},
         {source: 'た', target: 'ta'},
         {source: 'な', target: 'na'},
         {source: 'は', target: 'ha'},
         {source: 'ま', target: 'ma'},
         {source: 'や', target: 'ya'}
    ]
});
```

Demo
======
Try it at: http://youpinadi.github.com/jlearn

Contribute
===========
Send me pull requests with new decks! I'll be happy to merge them!
