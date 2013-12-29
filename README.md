pause-queue
===========

A queue for Node.js that can be paused and resumed. 

This can become useful if you want to stop processing when a resource
becomes unavailable and continue execution when it's available again.
Or what ever you can imagine.

## Installation

```bash
npm install pause-queue --save
```

Or manually add it to your package.json

## Example

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
  animalQueue.pause(function() { /* This is optional and will be called once all pending tasks are complete */ });
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

## Contributors

 - Max Kueng (http://maxkueng.com/)
 - Ivo Georgiev (http://ivogeorgiev.eu/)

## License

MIT License

Copyright (c) 2011 Max Kueng (http://maxkueng.com/)
 
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
