/* One will show the difference between the common way to access an array, while
comparing the performance of two different .map approaches.
*/

const service = require('./service');
const fs = require('fs');
const names_common = [];

//common way

async function common() {
    try {
        fs.readFile('people_data.json', 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error reading the file:', err);
            } else {
                try {
                    const results = JSON.parse(fileData);
                    results.forEach(function (i) {
                        names_common.push(i.name);
                    });
                    console.log('names_common', names_common); // Move the console.log here
                } catch (jsonParseError) {
                    console.error('Error parsing JSON:', jsonParseError);
                }
            }
        });
    } catch (error) {
        console.error(`Internal Error`, error);
    }
}
console.time('common')
common()
console.timeEnd('common')

// using .map method
names_map = []
async function map() {
    try {
        fs.readFile('people_data.json', 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error reading the file:', err);
            } else {
                try {
                    const results = JSON.parse(fileData);
                    results.map(function (person) {
                        names_map.push(person.name);
                    });
                    console.log('names_map', names_map);
                } catch (jsonParseError) {
                    console.error('Error parsing JSON:', jsonParseError);
                }
            }
        });
    } catch (error) {
        console.error(`Internal Error`, error);
    }
}
console.time('map')
map()
console.timeEnd('map')

//using a different map approach

Array.prototype.new_map_approach = function(callback) {
    const new_mapped_array = [];
    for (let index = 0; index <= this.length - 1; index++) { // Fixed typo in this.length
        const result = callback(this[index], index);
        new_mapped_array.push(result); // Push the result into the new_mapped_array
    }
    return new_mapped_array;
};

const names_new_map = [];
async function new_map() {
    try {
        fs.readFile('people_data.json', 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error reading the file:', err);
            } else {
                try {
                    const results = JSON.parse(fileData);
                    const names = results.new_map_approach(function(person, index) {
                        names_new_map.push(person.name); 
                        return person.name; 
                    });
                    console.log('names_new_map', names_new_map);
                } catch (jsonParseError) {
                    console.error('Error parsing JSON:', jsonParseError);
                }
            }
        });
    } catch (error) {
        console.error(`Internal Error`, error);
    }
}

console.time('new_map');
new_map();
console.timeEnd('new_map');

/* Explanations

Latency of the methods executed
common: 1.02ms
map: 0.1ms
new_map: 0.104ms

Common Method:

This method reads a JSON file, parses the data, and then uses a forEach loop to push
each name into the names_common array. This approach is synchronous and blocks the
execution while the file is read and data is processed. The forEach loop performs
an operation for each element in the array one at a time.

Using .map() Method:

This method utilizes the map function to iterate through the results array, creating
new array with the results of a provided function on every element in the array.
This method provides better performance compared to forEach because it takes advantage
of internal optimizations in JavaScript engine implementations that can parallelize
operations.

Custom new_map_approach:

This approach extends the Array.prototype by creating a custom new_map_approach function.
It manually iterates over the array using a for loop and pushes results into a new array
(new_mapped_array) similar to how map works. This approach does not take advantage of the
native optimizations in the JavaScript engine for array manipulation but provides a slightly
better performance compared to the regular map because it avoids creating a new array every
iteration (as map does), instead directly pushing to the array.

The performance difference between map and new_map is relatively minor in this case, because
of the small dataset size. The native .map() method is usually more optimized and efficient
due to its built-in capabilities, while the custom approach, although more manual, avoids
creating multiple intermediary arrays.

In larger and more complex scenarios, the performance difference might be more noticeable,
especially in cases where the number of iterations is larger, or the operations being 
performed within the mapping function are computationally intensive.

*/