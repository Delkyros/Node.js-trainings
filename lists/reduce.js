/*
Another way to get an array form another array is by reducing it.
*/


const fs = require('fs');


async function reduce() {
    try {
        fs.readFile('people_data.json', 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error reading the file:', err);
            } else {
                try {
                    const people = JSON.parse(fileData);
                    const heights = people.map(person => parseInt(person.height));
                    console.log(heights);
                    const total = heights.reduce((previous, next) => {
                        return previous + next;
                    }, 0); // WHENEVER MANIPULATING ARRAYS ALWAYS SET AN INITIAL VALUE

                    console.log('Total height:', total);
                } catch (error) {
                    console.log('Error parsing JSON data:', error);
                }
            }
        });
    } catch (error) {
        console.log('Something went wrong:', error);
    }
}
console.time('reduce')
reduce();
console.timeEnd('reduce')

Array.prototype.MyReduce = function (callback, starting_value){
    let final_value = typeof starting_value !== undefined ? starting_value : this[0]
    for (let index = 0; index <= this.length; index ++){
        final_value = callback(final_value + this[index], this)
    }
    return final_value
}

async function reduce_with_prototype() {
    try {
        fs.readFile('people_data.json', 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error reading the file:', err);
            } else {
                try {
                    const people = JSON.parse(fileData);
                    const heights = people.map(person => parseInt(person.height));
                    console.log(heights);
                    const total = heights.MyReduce((previous, next) => {
                        return previous + next;
                    }, 0); // WHENEVER MANIPULATING ARRAYS ALWAYS SET AN INITIAL VALUE
                } catch (error) {
                    console.log('Error parsing JSON data:', error);
                }
            }
        });
    } catch (error) {
        console.log('Something went wrong:', error);
    }
}
console.time('reduce_with_prototype')
reduce_with_prototype();
console.timeEnd('reduce_with_prototype')


/* Explanations

The latency results indicate that the reduce_with_prototype function, which uses the custom MyReduce() method, executed faster
than the reduce function that utilized the built-in reduce() method.

reduce: 0.969ms
reduce_with_prototype: 0.599ms

The custom method significantly reduces the execution time compared to the built-in reduce() method.The performance gain
might be due to various factors such as the direct iteration and processing in the custom MyReduce() function compared to
the built-in reduce() method, which might have additional abstractions or overhead that affect its execution time.

However, as in the previous example, it's important to note that performance gains can vary depending on the size of
the dataset and the specific implementation. In this case, for the provided dataset, the custom implementation appears
to be more efficient for calculating the total height of the individuals.

*/