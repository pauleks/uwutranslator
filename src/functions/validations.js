module.exports.validateToken = (token) => {
    return new Promise((resolve, reject) => {
        const tokenRegex = /[MNOPQ][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g;
        if (tokenRegex.test(token)) resolve();
        else reject("Token not valid.");
    });
}