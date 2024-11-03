

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        console.log(name, password);

        
        res.send({ success: true });
    } catch (error) {
        console.log(error);
    }
}

export default {
    login
}