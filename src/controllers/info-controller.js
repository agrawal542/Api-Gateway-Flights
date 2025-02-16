const { StatusCodes } = require("http-status-codes");

const info = (req, res, next) => {
    console.log("----controller---")
    return res.status(StatusCodes.OK).json(
        {
            sussess: true,
            message: 'Ok! Working Fine.',
            error: {},
            data: {},
        });
}


module.exports = {
    info
}