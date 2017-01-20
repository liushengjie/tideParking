const AdminBase = require('../../admin');
const mysql = require('../../../../libs/mysql');
const config = require('../../../../config');
const util = require('../../../../common/util')

class SaveOrUpdate extends AdminBase {
    handle() {

        const json = String(this.req.body.json || '');

        if (!json) {
            return this.fail({ 'reason': 'json does not exists' },'json does not exists');
        }
       
        var jsonObj = JSON.parse(json);
        var callback = (err,affectedRows) => 
        {
       		if(err){
       			this.fail({'reason': err.message },err.message );
       		}else{
   				this.success(affectedRows);
       		}
        }
        
        var sql = "select * from employer where memId = '" + jsonObj.memId + "'";
        mysql.query(sql).then((rows) => {
        	if(rows.length != 0 && jsonObj.addFlag != undefined){
        		this.fail({'reason': '此用户已经注册'},'此用户已经注册');
        	}else{
        		var obj = new Object();
		   			obj.id = jsonObj.id;
		   			obj.memId = jsonObj.memId;
		   			obj.zoneId = jsonObj.zoneId;
		   			obj.status = jsonObj.status;
		   			
		   		if(jsonObj.addFlag != undefined){
		   			mysql.addObject('employer',obj,callback);
		   		}else if(jsonObj.bjui_local_index != undefined){
		   			mysql.updateObject('employer',obj,{id:obj.id},callback);
		   			
		   		}else{
		   			mysql.findAndUpdate('employer',obj,callback);
		   		}
        	}
        })
        .catch((err) => {this.fail({'reason': err.message}); });
    }
}

module.exports = SaveOrUpdate.makeRouteHandler();