const AdminBase = require('../../admin');
const mysql = require('../../../../libs/mysql');
const config = require('../../../../config');

class list extends AdminBase {
    handle() {
        const phone = String(this.req.query.phone || '');
        const userName = String(this.req.query.userName || '');
        const userNo = String(this.req.query.userNo || '');
        
        var sql;
        const table = " select * from member ";
        const order = " order by id ";
        var condition = "where ";
        var flag = false;
		
		if(phone){
			condition += "phone like '%"+phone+"%' and ";
			flag = true;
		}
		if(userName){
			condition += "userName like '%"+userName+"%' and ";
			flag = true;
		}
		if(userNo){
			condition += "userNo like '%"+userNo+"%' and ";
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