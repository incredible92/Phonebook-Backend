const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://fullstack:${password}@cluster0.vun5p.mongodb.net/fullstack?retryWrites=true&w=majority
`;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: { 
    type: Date,
    required: true
  },
  important: Boolean

})

const Person = mongoose.model('Person', personSchema)

if(process.argv[3]){
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(response => {
    mongoose.connection.close()
    console.log(`added ${name} ${number} to phonebook`)
  })
}

else{
  
 

}