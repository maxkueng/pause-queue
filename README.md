### Example Usage

```javascript
var pausequeue = require('pause-queue'),
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

// Create a new queue. The first argument is the worker, the second is the concurrency (default: 1)
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

Output: 

    Aardvark 1s
    Albatross 2s
    Alligator 3s  // ...now waiting for 6 seconds
    Alpaca 10s
    Ant 10s
    Anteater 10s
    Antelope 10s
    Ape 10s
    Armadillo 10s
    Donkey 10s
    Baboon 11s
    Badger 12s
    Barracuda 13s
    Bat 14s
    Bear 15s
    Beaver 16s
    Bee 17s
    Bison 18s
    Buffalo 19s
