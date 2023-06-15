const mongoose = require('mongoose')

if(process.argv.length != 3 && process.argv.length != 5){
    console.log('should be in form node mongo.js <password> <name> <number>')
}

const password = process.argv[2]

const url = 
    `mongodb+srv://lewandoc:${password}@cluster0.ifhxskk.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)
if(process.argv.length == 5){
    const name = process.argv[3]
    const number = process.argv[4]
    
    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
else{
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
