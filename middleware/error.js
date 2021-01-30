const ErrorResponse = require("../utils/errorResponse");

const errrorHandler = (err, req, res, next) => {
    let error = err
    console.log(err.message, "ErrorFile");
    res.status(error.statusCode || 500).json({
        message: error.message || 'Server Error',
        success: "error",
        data: err.data
    })
    
}
module.exports = errrorHandler