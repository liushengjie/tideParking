const AppBase = require('../../app');
const mysql = require('../../../../libs/mysql');
const config = require('../../../../config');
const util = require('../../../../common/util')

class smsCode extends AppBase {
    handle() {
        const phone = String(this.req.query.phone || '');
        
        if (!phone) {
            return this.fail({ 'reason': 'phone does not exists' },'phone does not exists');
        }

        var callback = (err,affectedRows) => 
        {
       		if(err){
       			this.fail({'reason': err.message },err.message );
       		}else{
   				this.success(affectedRows);
       		}
        }
        var jsonObj = JSON.parse('{}');
        jsonObj.id = util.uuid();
        jsonObj.mobile = phone;
        jsonObj.sms_Code = util.generateMixed(6);
        jsonObj.create_Time = util.getNowFormatDate("yyyy-MM-dd HH:mm:ss");
        jsonObj.expire_Time = util.getNowFormatDate("yyyy-MM-dd HH:mm:ss",5);
        jsonObj.status = "0";
        
		mysql.addObject('sms_code',jsonObj,callback);
   			
    }
}

module.exports = smsCode.makeRouteHandler();