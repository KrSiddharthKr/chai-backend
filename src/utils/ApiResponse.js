// we can create the api response stdardized

class ApiResponse {
    constructor(statusCode, data, message="Success") {
        this.statusCode=statusCode,
        this.data=data,
        this.message=message,
        this.success=statusCode < 400
    }
}

// server has statusCodes , check what are the std status code
