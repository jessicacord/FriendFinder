var path = require("path");

module.exports = function(app) {
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    
    app.get("/:default?", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};


