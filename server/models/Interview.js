const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    interviewType:{
        type:String,
        required:true
    },

    answers:[
        {
            question:String,
            answer:String
        }
    ],

    score:{
        type:Number,
        default:0
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
    "Interview",
    interviewSchema
);