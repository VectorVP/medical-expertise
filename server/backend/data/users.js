const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin user',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'user_1',
        email: 'user_1@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'user_2',
        email: 'user_2@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'user_3',
        email: 'user_3@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'doc_1',
        email: 'doc_1@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        qualification: "middle",
        isDoc: true,
        specialty: "",
        price: "500",
        rating: 3,
        numReviews: 1,
        image: '/images/doc_1.jpg'
    },
    {
        name: 'doc_2',
        email: 'doc_2@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        qualification: "extra",
        isDoc: true,
        specialty: "",
        price: "400",
        rating: 4,
        numReviews: 6,
        image: '/images/doc_2.jpg'
    },
]

module.exports = users