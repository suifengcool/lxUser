module.exports = {
	api: '/view/search',
	response: function(req, res) {
		res.json({
		    "msg": "success",
		    "data": {
		        "totalRow": 1,//总条数
		        "pageNumber": 1,//当前第几页
		        "lastPage": true,//是否最后一页
		        "firstPage": true,//是否为最后一页
		        "totalPage": 1,//总页数
		        "pageSize": 10,//每页行数
		        "list": [
		            {
		                "line_name": "故宫西线",//线路名称
		                "price": 200,//费用
		                "real_name": "专业导游",//导游姓名
		                "gender": 0,//性别:0=女,1=男,2=未知
		                "user_id": 1,//导游ID
		                "introduce": "专业做导游，来者是客",//导游介绍
		                "scroe": 50,//导游评分
		                "resource_path": null//景点默认图处相对路径
		            }
		        ]
		    },
		    "prefix": "http://127.0.0.1:6070/",
		    "res_code": 200
		});
	}
}