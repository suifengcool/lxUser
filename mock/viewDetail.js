module.exports = {
	api: '/view/detail',
	response: function(req, res) {
		res.json({
		    "msg": "success",//信息，当res_code != 200时为错误信息内容
		    "data": {
		        "resource_path": "spot/1500557160929.png",//景点图片
		        "id": 10,//景点ID
		        "intruduce": "世界公园景点",//景点介绍
		        "view_name": "世界公园"//景点名称
		    },
		    "prefix": "http://127.0.0.1/lx/",//图片文件前缀
		    "res_code": 200//状态码，200=正常
		});
	}
}