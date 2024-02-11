const catchAsyncErrors = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch((err) => {
        console.log(err)
        next(err)
    })
}

export default catchAsyncErrors
