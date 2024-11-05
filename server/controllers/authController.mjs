import { connect } from "../utils/dbUtils.mjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    try {
        console.log('being hit')
        const { name, password } = req.body;
        console.log(name, password);

        const collection = await connect("attendance");

        const user = await collection.findOne({ uid: "attendance_admin"});
        const userList = user.users;
        const validUser = userList.find((item) => item.name === name);

        console.log('hh',validUser)

        if (!validUser) {
            return res.send({ message: 'User does not exist' });
        }

        const validPassword = userList.find((item) => {
            if (item.password === password) {
                return true
            }
        })

        if (!validPassword) {
            return res.json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ name:  validUser.name }, process.env.SECRET_KEY, { expiresIn: '1h'})

        console.log('hello',token)
        const userResponse = {
            name: validUser.name,
        }
        res.json({
            token,
            user: userResponse
        })
    } catch (error) {
        console.log(error);
    }
}

export default {
    login
}