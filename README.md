JLearn - Learn anything
======

JLearn is a flash card system which purpose is to be very easy to use and very efficient.
You don't have to press enter or use your mouse, just type what you believe is the answer (or press space if you don't know it)

Jlearn is build on AngularJS.
It's pretty easy to add new flash card decks, just create a file with an array containing the cards.

Here is a sample deck:

```javascript
decks.push(
{
    name: 'Hiragana alphabet',
    description: 'Learn the Hiragana alphabet',
    fuzzy: true, // optional, if defined student will be able to toggle the fuzzy option
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
});
```

Demo
======
Check it live at: http://youpinadi.github.com/jlearn


Contribute
===========
Send me pull request with new decks! i'll be happy to merge them!
