// stding the api error and response
// error format and response

// nodejs api error , different class error, gives a constructor, we will build our own constructor, we will overwrite the constructor

class ApiError extends Error {
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack="" // error stack
    ){
        // this is for construcotre overwrite
        super(message) // mesg for overwrite
        this.statusCode=statusCode
        this.data=null // study more , what is there in this.data field
        this.message=message
        this.success=false
        this.errors=errors

        if (stack) {
            this.stack=stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}