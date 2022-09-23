// Check if it is a valid email address
exports.validateEmail = function(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}

exports.validatePassword = function(password) {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password);
}