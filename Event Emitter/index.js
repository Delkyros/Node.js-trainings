/*
The event emitter is and action manipulator used in Javascript. This manipulator
is used with continuous action triggered by the programmed event, like the pressing
 of a button or changes in some files. All user interactions can be published in the
 browser and have an observer which will send that event message to a public hub. All
 users connected to that hub will get the event message.
*/


//Event  example
/* 
const Event_emitter = require('events')
class My_emitter extends Event_emitter{

} 
const My_emitter = new My_emitter()
const event_name = 'user:click'

My_emitter.on(event_name, function (click) {
    console.log('User has clicked', click)
})

My_emitter.emit(event_name, 'at a button')

My_emitter.emit(event_name, 'in the ok')

let count = 0
setInterval(function(){
    My_emitter.emit(event_name,'in the ok' + (count ++))
}, 1000)
*/

// Using stdin
/*
const stdin = process.openStdin()
stdin.addListener('data', function(value){
    console.log(`You typed: ${value.toString().trim()}`)
})
*/


// This will print whatever is typed in the terminal, after its execution



const stdin = process.openStdin()
function main(){
    return new Promise(function (resolve, reject){
        stdin.addListener('data', function(value){
            //console.log(`You typed: ${value.toString().trim()}`)
            return resolve(value);
    })
})
}

main().then(function(result){
    console.log('result', result.toString())
})

// By using a promise it will execute the print only once
    