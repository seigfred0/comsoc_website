

const login = async (req, res) => {
    try {
        const credential = req.body;
        console.log(credential);
        
        res.send({ success: true });
    } catch (error) {
        console.log(error);
    }
}

export default {
    login
}