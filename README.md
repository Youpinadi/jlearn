JLearn - Learn anything
======

JLearn is a flash card system which purpose is to be very easy to use and very efficient.
You don't have to press enter or use your mouse, just type what you beilive is the answer (or press space if you don't know it)


Jlearn is build on AngularJS.
It's pretty easy to add new flash card decks, just create a file with an array containing the cards.

Here is a sample deck:

```javascript
var hiragana =
{
    name: 'Hiragana alphabet',
    description: 'Learn the Hiragana alphabet',
    cards: [
         {source: 'あ', target: 'a'},
         {source: 'か', target: 'ka'},
         {source: 'さ', target: 'sa'},
         {source: 'た', target: 'ta'},
         {source: 'な', target: 'na'},
         {source: 'は', target: 'ha'},
         {source: 'ま', target: 'ma'},
         {source: 'や', target: 'ya'}
    ]
};
```

Demo
======
Check it live at: http://youpinadi.github.com/jlearn
