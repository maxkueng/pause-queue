### Example Usage

```javascript
var pausequeue = require('./index'),
  i = 0,
  start = +Date.now()
  animals = [
    'Aardvark', 'Albatross',
    'Alligator', 'Alpaca', 'Ant',
    'Anteater', 'Antelope', 'Ape',
    'Armadillo', 'Donkey', 'Baboon',
    'Badger', 'Barracuda', 'Bat', 
    'Bear', 'Beaver', 'Bee', 'Bison',
    'Buffalo' ];

// Helper function to show the time difference
function since (time) { return Math.round((time - start) / 1000) + 's'; }

// Create a new queue. The first argument is the worker, the second is the concurrency
var animalQueue = pausequeue(function (animal, done) {
  console.log(animal, since(+Date.now()));
  done(); // don't forget
}, 1);

// Pause the queue after 4 seconds
setTimeout(function () {
  animalQueue.pause();
}, 4000);

// Resume the queue after 10 seconds
setTimeout(function () {
  animalQueue.resume();
}, 10000);


// Add a new animal to the queue every second until all animals are added
var interval = setInterval(function () {
  if (i === animals.length) { return clearInterval(interval); }
  animalQueue.push(animals[i]);
  i++;
}, 1000);
```
