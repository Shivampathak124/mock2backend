const express = require("express");
const empRouter = express.Router();

const { empModel } = require("../model/empModel");
const { userModel } = require("../model/UserModel");


empRouter.get("/", async(req, res) => {
    const emp = await empModel.find({});
    res.send({ employee: emp });
})


empRouter.post("/", async (req, res) => {
    try {
    const { Fullname, LastName, Email, Department, Salary } = req.body;
    // const userId = req.userId;
    // const user = await userModel.findOne({ _id: userID });
    const employee = await empModel.create({Fullname, LastName, Email, Department, Salary})
    res.send({ employee: employee });
        
    } catch (error) {
        console.log(error);
    }
})

empRouter.patch("/edit/:empID", async (req, res) => {
    const empID = req.params.empID;
    const userId = req.userId;
    const user = await userModel.findOne({ _id: userID });
    const payload = req.body;
    const employee = await empModel.findOneAndUpdate({ _id: empID, payload });
    res.send({ message: `employee updated with ${empID}` });
})

empRouter.delete("/delete/:empID", async (req, res) => {
    const empID = req.params.empID;
    const userId = req.userId;
    const user = await userModel.findOne({ _id: userID });
    const employee = await empModel.findOneAndDelete({ _id: empID});
    res.send({ message: `employee deleted with ${empID}` });
})






module.exports = { empRouter };
