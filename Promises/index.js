/*
Objectives

Now one will use the Promises to create a recursive code
enabling one to catch and deal with errors.

importing a module from node.js
*/
const util = require('util')
const get_user_address_async = util.promisify(get_user_address)

function get_user() {
    // when something is wrong REJECT(error)
    // when everything is fine RESOLVE
    return new Promise(function promises_solver(RESOLVE, REJECT){
    setTimeout(function (){
        //To check if the catch is working uncomment the line bellow
        //return REJECT(new Error('Error manipulation test'))
        return RESOLVE({
            id:1,
            name: "someone",
            birth: new Date()
        })
    }, 1000);

    })
}

function get_user_phone(user_id) {
    return new Promise(function promises_solver(RESOLVE, REJECT){
        setTimeout(()=>{
            return RESOLVE({
                IDC:'+55',// international dialing code
                SAC: '48',// Specific area code within Brazil (+55)
                phone: '35428967'
            })
        },2000);
    })
}

function get_user_address(user_id, callback) {
    setTimeout(()=>{
        return callback(null, {
            street: "A good street",
            number: "42",
            city: "A perfect city",
            State: 'Acre',
            postal_code: "88693145",
            country: "Brazil"
        })
    },2000);
}

//Converting the function get_user_address into a promise


/*

function user_callback(error, user){
    console.log("user", user)
}

get_user(function RESOLVE_user(error, user){
    if(error){ //if any True error value is given
        console.error('Something is wrong with the user data', error)
        return;
    }
    get_user_phone(user.id, function RESOLVE_user_phone(error1, phone){
    if(error){ //if any True error value is given
        console.error("Something is wrong with the user's phone", error1)
        return;
    }  
    get_user_address(user.id, function RESOLVE_user_address(error2, address){
        if(error){
        console.error("something is wrong with the user's address", error2)
        return;
    }
    console.log(`
    Name: ${user.name},
    Address: ${JSON.stringify(address, null, 2)}
    Phone:${JSON.stringify(phone, null, 2)}
    `)
    })
    })
})
*/

//Example of promise application


const user_promise = get_user()
// for success one uses .then
// for errors one uses .catch
// stack order: user > phone > phone
user_promise
    .then(function(user){
        return get_user_phone(user.id)
            .then(function resolve_phone(result){
                return{
                    user: {
                        name: user.name,
                        id: user.id
                    },
                    phone: result
                }
            })
    })
    .then(function (result2){
        const address = get_user_address_async(result2.user.id)
        return address.then(function resolve_user_address(result){
            return{
                user: result2.user,
                phone: result2.phone,
                address: result
            }
        });
    })

    .then(function(result2){
        console.log(`
        Name: ${result2.user.name}
        Address: ${result2.address.street},${result2.address.number}
        Phone: ${result2.phone.IDC} (${result2.phone.SAC}) ${result2.phone.phone}
        `)
    })
    .catch( function (error){
        console.error('Something went wrong', error)
    })

/*Considerations

Callbacks tend to create functions, which uses other functions as arguments. This could create 
a very complex code and a challenge when something goes wrong. To ease the job of fixing and 
troubleshooting code, promises are used. This type of coding avoid the "callback hell" problem
and allows one to handle errors when they appear. The problems of promises is that they are immutable
and are not always backwards compatible. This means that when a promise state is defined it cannot 
change, in other words, if they exist they cannot be cancelled.

*/