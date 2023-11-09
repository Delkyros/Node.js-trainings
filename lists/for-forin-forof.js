/*
One will be testing 3 different ways to get a list of Star Wars names.
First one will use For to iterate trough the url of each name, then one
 will be using for...in, for...of and for each.
*/
const fs = require('fs');
const service = require('./service');
var names = []
    
async function fetchAndProcessData() {
    try {
        let people = [];

        for (let i = 1; i <= 16; i++) {
            // Assuming service.get_people(i) returns a Promise
            const result = await service.get_people(i);
            people.push(result);
        }

        if (people.length > 0) {
            fs.writeFile('people_data.json', JSON.stringify(people), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('Data written to file');
                }
            });
        } else {
            console.log('No data fetched or empty array received.');
        }

        processPeople(people);
        return people;
    } catch (error) {
        console.error('Error:', error);
    }
}

function processPeople(people) {
    try {
        let namesFor = []

        console.time('for');
        for (let i = 0; i < people.length; i++) {
            namesFor.push(people[i].name);
        }
        console.timeEnd('for');

        const namesForIn = [];
        console.time('forIn');
        for (let i in people) {
            namesForIn.push(people[i].name);
        }
        console.timeEnd('forIn');

        const namesForOf = [];
        console.time('forOf');
        for (let person of people) {
            namesForOf.push(person.name);
        }
        console.timeEnd('forOf');

        console.log('names (for loop):', namesFor);
        console.log('names (for...in loop):', namesForIn);
        console.log('names (for...of loop):', namesForOf);
    } catch (error) {
        console.error('Error processing people:', error);
    }
}

function main() {
    try {
        let data = null;
        try {
            // Read the JSON file with the correct encoding and a callback function to handle the data
            fs.readFile('people_data.json', 'utf8', (err, fileData) => {
                if (err) {
                    console.error('Error reading the file:', err);
                } else {
                    // Parse the file data
                    const people = JSON.parse(fileData);
                    processPeople(people);
                }
            });
        } catch (err) {
            console.error('Error reading the file:', err);
        }
    } catch (error) {
        console.error('Internal Error:', error);
    }
}

main();


/*
The time that takes to use for loop is longer than for...of which is longer than for...in.

There is a little difference between for..in and for...of loops.

For access the API and creates the names 
list, while the for...in and for...of loops requires a list already done.

latency of the loops

for: 0.075ms
forIn: 0.017ms
forOf: 0.044ms

for loop: The traditional for loop is optimized for numerical iteration. It's generally
very fast for iterating over arrays when the index is needed or when precise control
over the iteration is required. However, it might be slightly slower than for...of or
for...in loops when simply iterating through an array.

for...in loop: In JavaScript, this loop is designed to iterate over the keys of
an object. When used with arrays, it iterates over the enumerable properties, including
not only array elements but also any additional properties that have been added to the
array. This loop can be faster in some cases because it's optimized for object keys, 
but it's not always recommended for iterating over arrays due to potential performance
drawbacks, especially when dealing with arrays that have additional non-index properties.

for...of loop: The for...of loop is designed specifically for iterating over elements in
an array (or other iterable objects). It provides a more straightforward syntax to access
array elements and tends to be faster and cleaner than the for...in loop for iterating
through arrays.

*/