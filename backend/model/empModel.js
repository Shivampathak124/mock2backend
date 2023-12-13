const mongoose = require("mongoose");



const empSchema = mongoose.Schema({
   FirstName : "String",
    LastName: "String",
    Email: "String",
    Department: "String",
    Salray : Number
})

const empModel = mongoose.model("Employee", empSchema);

module.exports = { empModel };
