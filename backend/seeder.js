const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

const users = require('./data/users')
const news = require('./data/news')

const User = require('./models/userModel')
const New = require('./models/newsModel')

const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try {
       
        await User.deleteMany()
        await New.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleNews = news.map( singleNew => {
            return {...singleNew}
        }) 

        await New.insertMany(sampleNews)

        console.log(colors.green.underline('Data Imported!'))
        process.exit()
    } catch (error) {
        console.log(colors.red.underline("Error: ", error))
        process.exit(1)
    }
}

const destroyData = async () => {
    try {

        await User.deleteMany()
        await New.deleteMany()

        console.log(colors.green.underline('Data destroyed!'))
        process.exit()
    } catch (error) {
        console.log(colors.red.underline("Error: ", error))
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}