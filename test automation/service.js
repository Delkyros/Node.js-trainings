const axios = require('axios');
const URL = 'http://swapi.dev/api/people/';

// to manipulate promises inside the function, one will use async
async function get_people(number) {
    const url = `${URL}${number}/`;
    try {
        const response = await axios.get(url);

        // Check if response.data is an array or an object
        const data = Array.isArray(response.data) ? response.data : [response.data];
        console.log(JSON.stringify(data)); // Added a missing space between JSON.stringify and data
        return data.map(peopleMapper);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        // Handle the error as needed
        throw error; // Re-throw the error to be handled by the caller
    }
}

function peopleMapper(item) {
    return {
        name: item.name,
        mass: item.mass
    };
}

// for tests
get_people(2);

module.exports = {
    get_people
};