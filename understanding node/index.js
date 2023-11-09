/*
Objectives

Get a user
Get its id
Get its phone number
Get its address


One will use a simulation of how does node
 access a database to find those information.
*/

function get_user(callback) {
    setTimeout(function (){
        return callback(null, {
            id:1,
            name: "someone",
            birth: new Date()
        })
    }, 1000);

}

function user_callback(error, user){
    console.log("user", user)
}


function get_user_phone(user_id, callback) {
    setTimeout(()=>{
        return callback(null,{
            ddd: 48,
            phone: '+554835428967'
        })
    },2000);
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

//const user = get_user()
//const user_phone = get_user_phone(user)
//const user_address = get_user_address(user)

get_user(function resolve_user(error, user){
    if(error){ //if any True error value is given
        console.error('Something is wrong with the user data', error)
        return;
    }
    get_user_phone(user.id, function resolve_user_phone(error1, phone){
    if(error){ //if any True error value is given
        console.error("Something is wrong with the user's phone", error1)
        return;
    }  
    get_user_address(user.id, function resolve_user_address(error2, address){
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
