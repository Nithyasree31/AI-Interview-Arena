const fs = require("fs");
const pdfParse = require("pdf-parse");

const analyzeResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No resume uploaded"
            });
        }

        const dataBuffer =
            fs.readFileSync(req.file.path);

        const pdfData =
            await pdfParse(dataBuffer);
        global.resumeText = pdfData.text;
        console.log("Resume Saved!");
        console.log(global.resumeText);

        res.status(200).json({
            message: "Resume analyzed successfully",
            text: pdfData.text
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    analyzeResume
};