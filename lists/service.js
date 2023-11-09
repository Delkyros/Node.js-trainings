const axios = require('axios');
const URL = 'http://swapi.dev/api/people/';

//to manipulate promises inside the function one will use async
async function get_people(number) {
    const url = `${URL}${number}/`
    const response = await axios.get(url)
    return response.data
}

//for tests
//get_people(1)



module.exports = {
    get_people
}
