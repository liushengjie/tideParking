const RouterBase = require('../../common/routerbase');

class AdminBase extends RouterBase {
    constructor() {
        super(...arguments);
    }

    success(list = {}, msg = '') {
        this.res.json({ statusCode: 0, msg, list });
    }

    fail(error = { 'reason': 'something wrong was happened' }, msg = 'fail') {
        this.res.json({ statusCode: -1, msg, error });
    }
}

module.exports = AdminBase;