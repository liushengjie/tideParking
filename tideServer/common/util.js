
exports.jsonToVal = (json) => {
    var ret = "";
    console.log(JSON.stringify(json))
    for(var key in json){
        ret += key + "='" + json[key] + "' and ";
    }
    return ret.substring(0,ret.length-4);
}

exports.removeJsonItem = (json,name) => {
	for(var key in json){
        if(key == name){
        	delete json[key]
        	break
        }
    }
}
