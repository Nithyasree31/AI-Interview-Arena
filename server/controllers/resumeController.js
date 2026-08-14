const fs = require("fs");
const pdf = require("pdf-parse");

console.log("FILE LOADED:", __filename);

module.exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    const data = await pdf(dataBuffer);

    // ✅ SAVE RESUME TEXT GLOBALLY
    global.resumeText = data.text;

    console.log(
      "Resume Stored:",
      global.resumeText.substring(0, 300)
    );

    res.json({
      message: "Resume uploaded successfully",
      textLength: data.text.length,
      preview: data.text.substring(0, 300)
    });

  } catch (error) {
    console.log("ERROR:", error.message);

    res.status(500).json({
      message: error.message
    });
  }
};