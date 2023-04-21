import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({ id }, "naveeenkumar", {
        expiresIn: '2h' 
    })
}

export default generateToken