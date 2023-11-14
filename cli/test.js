const {
    deepEqual,
    ok
} =  require('assert')

const database =  require('./database')



//test this too with both
const DEFAULT_ITEM_REGISTER =  {
    "name": "Barry Alen",
    "power": "Speedforce",
    "id": 1
    }   



describe('Hero manipulation suite', ()=>{
    it('Must search a hero using files', async()=>{
        const expected = DEFAULT_ITEM_REGISTER
        
        //use only the fisrt item inside the array  to pass the test with deepequal()
        const [result] = await database.lister(expected.id)
        deepEqual(result, expected)

        //Uncomment this to do the above tests
        //const result = await database.lister(expected.id)
        //ok(result, expected)

        /*Considering the database and using the ok() function, the code will
         pass the test, but when using deep equal it will not.
         This happens because the ok function does't take anything 
         else but only if the value is true. */        
    })

})

