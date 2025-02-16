const { StatusCodes } = require("http-status-codes");

const info = (req, res, next) => {
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