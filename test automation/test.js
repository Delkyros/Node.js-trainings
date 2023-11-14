const assert = require('assert');
const { get_people } = require('./service'); 

/*
describe('Star Wars Tests', function () {
    it('Must search C-3P0 with the correct index, returning the correct format', async function () {
        this.timeout(5000); // Increase the timeout if needed

        const result = await get_people(2);
        const expected = [{
            name: 'C-3PO', 
            mass: '75', 
        }];

        assert.deepStrictEqual(result, expected);
    });
});
*/

//now one will be using nock to simulate default results

const nock = require('nock')

function describe_nock(description, callback) {
    describe(description, function () {
        beforeAll(() => {[
            {"name":"C-3PO",
            "height":"167",
            "mass":"75",
            "hair_color":"n/a",
            "skin_color":"gold",
            "eye_color":"yellow",
            "birth_year":"112BBY",
            "gender":"n/a","homeworld":"https://swapi.dev/api/planets/1/",
            "films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/2/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],
            "species":["https://swapi.dev/api/species/2/"],
            "vehicles":[],
            "starships":[],
            "created":"2014-12-10T15:10:51.357000Z",
            "edited":"2014-12-20T21:17:50.309000Z",
            "url":"https://swapi.dev/api/people/2/"}]         
    });

        callback();
    });


    it('Must search C-3P0 with the correct index, returning the correct format', async function () {
        this.timeout(5000); // Increase the timeout if needed

        const result = await get_people(2);
        const expected = [{
            name: 'C-3PO', 
            mass: '75', 
        }];

        assert.deepStrictEqual(result, expected);
    });
};