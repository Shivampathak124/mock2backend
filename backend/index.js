
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");




const {userModel} = require("./model/UserModel")
const { connection } = require("./config/db")
const { auth } = require("./middleware/auth");
const { empRouter } = require("./routes/employee");

const app = express();
app.use(cors({
    origin : "*"
}))

app.use(express.json());

const port = 8080;


app.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const alreadyExit = await userModel.findOne({ email })
    if (alreadyExit) {
        res.json({ message: " User already exit please login" })
        
    }
    bcrypt.hash(password, 8, async function (err, hash) {
        await userModel.create({ email, password: hash })
        return res.json({ message: "user successfully registered" })
    })

    
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.json({ message: "Please signup" });
    }

    const hashedPassword = user?.password
    bcrypt.compare(password, hashedPassword, function (err, result) {
        if (result) {
            const token = jwt.sign({ userId: user._id }, 'mockSecret');
             return res.json({ message: " Login Successful" , token : token });
        } else {
            return res.json({ message: "Invalid Credentials" });
        }
    }) 
})

app.use(auth);
app.use("/employees", empRouter);



app.listen(port, async() => {
    try {
        await connection;
        console.log(` listing on ${port}`);
    } catch (error) {
        console.log(error); 
    }
})
