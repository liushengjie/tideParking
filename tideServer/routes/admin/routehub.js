module.exports = (router) => {
    router.get('/base/member/list', require('./members/handlers/list'));
    router.post('/base/member/saveOrUpdate', require('./members/handlers/saveOrUpdate'));
    router.get('/base/property/list', require('./property/handlers/list'));
    router.post('/base/property/saveOrUpdate', require('./property/handlers/saveOrUpdate'));
    router.get('/base/zone/list', require('./zone/handlers/list'));
    router.post('/base/zone/saveOrUpdate', require('./zone/handlers/saveOrUpdate'));
    router.get('/base/employer/list', require('./employer/handlers/list'));
    router.post('/base/employer/saveOrUpdate', require('./employer/handlers/saveOrUpdate'));
};
