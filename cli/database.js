const {
    readFile
} = require('fs')

const {
    promisify
} = require('util')

const readfileAsync = promisify(readFile)

class Database{
    constructor(){
        this.FILE_NAME = 'heroes.json'
    }
    async getDataFiles(){
        const file = await readfileAsync(this.FILE_NAME, 'utf8')
        /* this is the same as doing
        const dataJson = require('./heroes.json')
        ,but synchronously. In the context of databases and
        registration it is not recommended. 
        When loading configuration files its ok to use synchronously*/
        return JSON.parse(file.toString())
    }
    fileWriter(){

    }
    async lister(id){
        const data =  await this.getDataFiles()
        const filteredData = data.filter(item => (id ? (item.id === id): true))
        return filteredData
    }
}

module.exports = new Database()