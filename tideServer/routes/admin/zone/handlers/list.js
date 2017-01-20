const AdminBase = require('../../admin');
const mysql = require('../../../../libs/mysql');
const config = require('../../../../config');

class list extends AdminBase {
    handle() {
        const name = String(this.req.query.name || '');
        const propertyId = String(this.req.query.propertyId || '');
        const addr = String(this.req.query.addr || '');
        
        var sql;
        const table = "SELECT z.*,p.id as propertyId,p.propertyName from zone z LEFT JOIN property p on z.propertyId = p.id ";
        const order = " order by z.id ";
        var condition = "where ";
        var flag = false;
		
		if(name){
			condition += "name like '%"+name+"%' and ";
			flag = true;
		}
		if(propertyId){
			condition += "propertyId like '%"+propertyId+"%' and ";
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