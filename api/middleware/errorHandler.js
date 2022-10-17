

const errorHandler = (error, req, res, next)=>{

    const errStatus = error.status || 500;
    const errMsg = error.message || 'Unknown Error'


    return res.status(errStatus).json({
        message:errMsg,
        status:errStatus,
        stack:error.stack
    })

}

export default errorHandler