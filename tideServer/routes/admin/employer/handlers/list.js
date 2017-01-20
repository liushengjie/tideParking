const AdminBase = require('../../admin');
const mysql = require('../../../../libs/mysql');
const config = require('../../../../config');

class list extends AdminBase {
    handle() {
        const phone = String(this.req.query.phone || '');
        const userName = String(this.req.query.userName || '');
        const userNo = String(this.req.query.userNo || '');
        
        var sql;
        const table = " SELECT e.id,e.memId,m.userNo,m.userName,m.phone,e.zoneId,z.name,z.addr,e.status "+
        			  "from employer e ,member m ,zone z ";
        const order = " order by e.id ";
        var condition = "where e.memId = m.id and e.zoneId = z.id ";
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
       	
       	if(flag){
       		condition = condition.substring(0,condition.length-4);
       	}
   		sql = table + condition + order;
    
        mysql.query(sql).then((rows) => this.success(rows))
        .catch((err) => this.fail({'reason': err.message}));
        
    }
}

module.exports = list.makeRouteHandler();