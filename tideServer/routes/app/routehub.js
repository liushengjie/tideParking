module.exports = (router) => {
    router.get('/base/zone/list', require('./zone/handlers/list'));
    router.get('/login/smscode', require('./login/handlers/smscode.js'));
    router.post('/login/login', require('./login/handlers/login.js'))
};