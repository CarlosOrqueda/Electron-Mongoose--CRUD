const mongoose = require('mongoose')

const optionDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

async function connect () {
    try {
        await mongoose.connect('mongodb://localhost/electrondb', optionDB)
        console.log('DB is connected')
    } catch (e) {
        console.log(e)
    }
}

module.exports = connect()