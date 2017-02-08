const AppBase = require('../../app');
const mysql = require('../../../../libs/mysql');
const redis = require('../../../../libs/redis');
const config = require('../../../../config');
const co = require('co');

class login extends AppBase {
    handle() {
        const phone = String(this.req.body.phone || '');
        const code = String(this.req.body.code || '');
        
        if (!phone) {
            return this.fail({ 'reason': 'phone does not exists' },'phone does not exists');
        }
        
        if (!code) {
            return this.fail({ 'reason': 'code does not exists' },'code does not exists');
        }
        
        const sql = "select * from sms_code where mobile = ? and sms_Code = ? and status = '0' and current_timestamp() < expire_Time";
       	
        mysql.query(sql,[{mobile:phone},{sms_Code:code}]).then((rows) => {
        	if(rows.length > 0){
		        co.wrap(function *() {
		            let client;
		
		            try {
		                client = yield redis.connect();
		
		            } catch (err) {
		                this.fail({ 'reason': err.message });
		            } finally {
		                client && client.close();
		            }
		        }).call(this);
        	}
        })
        .catch((err) => this.fail({'reason': err.message}));
        
    }
}

module.exports = login.makeRouteHandler();