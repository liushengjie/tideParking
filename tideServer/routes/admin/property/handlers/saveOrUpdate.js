const AdminBase = require('../../admin');
const mysql = require('../../../../libs/mysql');
const config = require('../../../../config');
const util = require('../../../../common/util')
const co = require('co');

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
       
   		if(jsonObj.addFlag != undefined){
   			util.removeJsonItem(jsonObj,'addFlag');
   			mysql.addObject('property',jsonObj,callback);
   			
   		}else if(jsonObj.bjui_local_index != undefined){
   			util.removeJsonItem(jsonObj,'bjui_local_index');
   			mysql.updateObject('property',jsonObj,{id:jsonObj.id},callback);
   			
   		}else{
   			mysql.findAndUpdate('property',jsonObj,callback);
   		}
       
    }
}

module.exports = SaveOrUpdate.makeRouteHandler();