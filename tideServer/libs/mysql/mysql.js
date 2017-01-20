const co = require('co');
const MySqlClient = require('mysql');
const config = require('../../config');


console.log('========================================');
console.log('MYSQL CONNECTION =>', config.host);
console.log('========================================\n');

let pool = MySqlClient.createPool({
            host: config.host,
            password: config.password,
            user: config.user,
            database: config.database
    });

//执行所有sql语句
function execQuery(sql, values, callback) {
    var errinfo;
    pool.getConnection(function(err, connection) {
        if (err) {
            errinfo = 'DB-获取数据库连接异常！';
            console.log(errinfo);
            throw errinfo;
        } else {
            var querys = connection.query(sql, values, function(err, rows) {
                release(connection);
                if (err) {
                    errinfo = 'DB-SQL语句执行错误:' + err;
                    console.log(errinfo);
                    //throw errinfo;
                    callback(err);
                } else {
                    callback(null,rows);
                }
            });
            console.log(querys.sql);
        }
    });
}

function release(connection) {
    try {
        connection.release(function(error) {
            if (error) {
                console.log('DB-关闭数据库连接异常！');
            }
        });
    } catch (err) {}
}

function execUpdate(sql, values, callback){
    execQuery(sql, values, function(err,result) {
    	
        if (callback) {
            var affectedRows = 0;
            if (result) {
                affectedRows = result.affectedRows
            }
            if(err){
            	callback(err,{affectedRows: 0});
            }else{
            	callback(null,{
	                affectedRows: affectedRows
	            });
            }
            
        }
    });
}

//执行sql语句，返回影响条数
exports.update = function(sql, values, callback) {
    execUpdate(sql, values, callback);
}

//查询分页
exports.queryPage = function(sql, values, page, size, callback) {
    if (page > 0) {
        page--;
    } else {
        page = 0;
    }
    execQuery(sql + ' LIMIT ' + page * size + ',' + size, values, function(rresult) {
        var index = sql.toLocaleUpperCase().lastIndexOf(' FROM');
        sql = 'SELECT COUNT(*) count ' + sql.substring(index);
        execQuery(sql, values, function(cresult) {
            if (callback) {
                var pagenum = cresult[0].count / size;
                if (cresult[0].count % size > 0) {
                    pagenum++;
                }
                callback({
                    count: pagenum,
                    rows: rresult
                });
            }
        });
    });
}

exports.findAndUpdate = function(tablename, json, callback){
 	sql = 'SELECT COUNT(*) count from ?? where ?';
 	execQuery(sql, [tablename,{id:json.id}], (err, cresult) => {
 		if(err){
 			callback(err,{affectedRows: 0});
 		}else{
	 		if(cresult[0].count != 0){
		        var sql = 'UPDATE ?? SET ? WHERE ?';
			    execUpdate(sql, [tablename,json, {id:json.id}], callback);
	 		}else{
	 			var sql = 'INSERT INTO ?? SET ?';
	 			execUpdate(sql, [tablename,json], callback);
	 		}
 		}
 	});
}

exports.query = function(sql, values){
    return new Promise(function(resolve, reject){
        execQuery(sql,values, function(err, rows){
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    });
}

exports.getById = function(tablename, id){
    return new Promise(function(resolve, reject){
        var values = {id:id};
        var sql = 'select * from ?? where ?';
        execQuery(sql,[tablename, values], function(err, rows){
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    });
}

//查询对象
exports.getObject = function(tablename, values, callback) {
    var sql = 'SELECT * FROM ?? WHERE ?';
    execQuery(sql, [tablename, values], function(result) {
        if (callback) {
            if (result && result.length > 0) {
                callback(result[0]);
            } else {
                callback(null);
            }
        }
    });
}

//添加一条记录
exports.addObject = function(tablename, values, callback) {
    var sql = 'INSERT INTO ?? SET ?';
    execUpdate(sql, [tablename, values], callback);
}

//更新记录
exports.updateObject = function(tablename, values, id, callback) {
    var sql = 'UPDATE ?? SET ? WHERE ?';
    execUpdate(sql, [tablename,
        values, id
    ], callback);
}

//删除记录
exports.deleteObject = function(tablename, values, callback) {
    var sql = 'DELETE FROM ?? WHERE ?';
    execUpdate(sql, [tablename, values], callback);
}