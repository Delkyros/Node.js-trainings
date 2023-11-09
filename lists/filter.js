/*
Now one will filter the array extracted from the API based on other characteristics.
*/

const fs = require('fs');


function filter_lars_names(people) {
    const lars_family = people.filter(function(person) {
        //if  the person is from lars family it will be returned a True state and it will stay in the list
        //                                avoiding case sensitive filtering
        const result = person.name.toLowerCase().indexOf('lars') !== -1;
        //found= index in the array
        //not found = -1

        // to bring all of those that are not form lars family   === instead of !==
//      const result = person.name.toLowerCase().indexOf('lars') === -1

        return result;
    });
    return lars_family; // Return the filtered array
}

function main() {
    try {
        fs.readFile('people_data.json', 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error reading the file:', err);
            } else {
                const people = JSON.parse(fileData);
                const larsFamily = filter_lars_names(people); // Retrieve the filtered array
                const larsFamilyNames = larsFamily.map((person)=> person.name)
                console.log(larsFamilyNames); // Display the filtered data
            }
        });
    } catch (error) {
        console.error('Something went wrong', error);
    }
}

//Execute main to see the results


console.time('main')
main();
console.timeEnd('main')


// Now one will implement a new type of filtering technique

Array.prototype.MyFilter = function(callback){
    person_list = []
    for(person_index in this){
        const person = this[person_index]
// the .filter method uses item, index and array as parameters, just like the callback
        const result = callback(person,person_index, this)
        if(!result) continue;
        person_list.push(person)
    }
    return person_list
}


function filter_lars_names2(people) {
    const lars_family = people.MyFilter((person, person_index, person_list) =>{
    return person.name.toLowerCase().indexOf('lars') !== -1
    })
    return lars_family; // Return the filtered array
}

function main_array_prototype() {
    try {
        fs.readFile('people_data.json', 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error reading the file:', err);
            } else {
                const people = JSON.parse(fileData);
                const larsFamily = filter_lars_names2(people); // Retrieve the filtered array
                const larsFamilyNames = larsFamily.map((person)=> person.name)
                console.log(larsFamilyNames); // Display the filtered data
            }
        });
    } catch (error) {
        console.error('Something went wrong', error);
    }
}
console.time('main_array_prototyped')
main_array_prototype()
console.timeEnd('main_array_prototyped')

/* Considerations

The main goal was to compare the performance (latency) of the traditional filter() method and a custom filter
implemented using a prototype method MyFilter().The main difference between the two methods is the way the
filtering is done. The latency results indicate that the main_array_prototyped function, which uses the 
custom MyFilter() method, executed significantly faster than the main function that utilized the built-in
filter() method.

main: 1.843ms
main_array_prototyped: 0.204ms

This result suggests that the custom implementation of the filter method (MyFilter()) is more efficient
than the standard filter() method for this specific operation on the provided dataset. This performance
gain might be due to various factors, such as the direct iteration and processing in the custom filter
function compared to the built-in filter() method, which might have additional abstractions or overhead
that affect its execution time.

*/
