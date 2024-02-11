const sendResponse = (res, status, data = {}, message) => {
    return res.status(status).json({
        success: true,
        code: status,
        message: message || 'OK',
        results: data,
    })
}

export default sendResponse
