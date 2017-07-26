module.exports = {
	api: '/user/code',
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
		                "real_name": "矮子好",//导游姓名
		                "guide_user_id": 1,//导游ID
		                "comment": "专业做导游，来者是客",//评论内容
		                "avatar_img": "134141.png"//用户头像地址
		            }
		        ]
		    },
		    "prefix": "http://127.0.0.1:6070/",
		    "res_code": 200
		});
	}
}