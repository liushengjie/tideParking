const AdminBase = require('../../admin');
const mysql = require('../../../../libs/mysql');
const config = require('../../../../config');

class list extends AdminBase {
    handle() {
        const propertyName = String(this.req.query.propertyName || '');
        const contacts = String(this.req.query.contacts || '');
        const phone = String(this.req.query.phone || '');
        const addr = String(this.req.query.addr || '');
        
        var sql;
        const table = " select * from property ";
        const order = " order by id ";
        var condition = "where ";
        var flag = false;
		
		if(propertyName){
			condition += "propertyName like '%"+propertyName+"%' and ";
			flag = true;
		}
		if(contacts){
			condition += "contacts like '%"+contacts+"%' and ";
			flag = true;
		}
		if(phone){
			condition += "phone like '%"+phone+"%' and ";
			flag = true;
		}
		if(addr){
			condition += "addr like '%"+addr+"%' and ";
			flag = true;
		}
        condition = condition.substring(0,condition.length-4);
       	
       	if(!flag){
       		sql = table + order;
       	}else{
       		sql = table + condition + order;
       	}
       	
        mysql.query(sql).then((rows) => this.success(rows))
        .catch((err) => this.fail({'reason': err.message}));
        
    }
}

module.exports = list.makeRouteHandler();