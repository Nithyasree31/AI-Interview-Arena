const Interview =
require("../models/Interview");

const saveInterview =
async (req,res)=>{

try{

const interview =
await Interview.create(req.body);

res.status(201).json(interview);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};

module.exports = {
saveInterview
};