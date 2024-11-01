//send the following parameters if data doesnt exist send null.
const success = (msg, statusCode, data, res) => {
    try {
        if (data)
            res.status(statusCode).json({ message: msg, data: data })
        else
            res.status(statusCode).json({message: msg});
    } catch (error) {
        res.status(500).json({message: 'Server error!, please try again'});
    }
};

const error = (err, statusCode, res) => {
    try {
        res.status(statusCode).json({message: err});
    } catch (error) {
        res.status(500).json({message: 'Server responseHandler error!, please try again'});
    }
};

export const responseHandler = {
    success,
    error
}