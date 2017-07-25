module.exports = {
	api: '/view/guideInfo',
	response: function(req, res) {
		res.json({
		    "msg": "success",
		    "data": {
		        "list": [
		            {
		                "nick_name": "环游世界",//用户昵称
		                "user_id": 1,//用户ID
		                "COMMENT": "专业做导游，来者是客",//评论内容
		                "avatar_img": null//用户头像地址
		            }
		        ],
		        "info":{
		            "view_line_content":"故宫西线人文游",//线路内容
		            "visit_length":180,//参观时长
		            "real_name":"矮子好",//导游姓名
		            "view_img":"spot/1313.png",//景点图片
		            "user_img":"131434.jpg",//导游头像地址
		            "commentCnt":5,//评论数
		            "favoriteCnt":10//收藏人数
		        }
		    },
		    "prefix": "http://127.0.0.1:6070/",
		    "res_code": 200
		});
	}
}