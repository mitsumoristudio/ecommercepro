import bcrypt from "bcryptjs"

export const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Mia Mitsumori',
        email: 'mia@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]

export default users;