module.exports = {
	api: '/view/index',
	response: function(req, res) {
		res.json({
		    "msg": "success",
		    "data": {
		        "hots": [//热门景点
		            {
		                "resource_path": "spot/1500557160929.png",//景点图片=prefix+resource_path
		                "id": 10,//景点id，获取景点详情使用
		                "intruduce": "世界公园景点",//景点描述
		                "view_name": "世界公园"//景点名称
		            },
		            {
		                "resource_path": "spot/1500310316181.jpg",
		                "id": 1,
		                "intruduce": "故宫故宫",
		                "view_name": "故宫"
		            },
		            {
		                "resource_path": "spot/1500186642860.jpg",
		                "id": 3,
		                "intruduce": "劳而无功相去甚远劳而无功",
		                "view_name": "圆明园"
		            }
		        ],
		        "list": {//景点索引
		            "G": [//首字母
		                {
		                    "first_letter": "G",//景点首字母
		                    "view_spot_id": 1,//景点id
		                    "full_letter": "GUGONG",//景点全字母
		                    "view_name": "故宫"//景点名称
		                }
		            ],
		            "s": [
		                {
		                    "first_letter": "s",
		                    "view_spot_id": 10,
		                    "full_letter": "shijiegongyuan",
		                    "view_name": "世界公园"
		                }
		            ],
		            "Y": [
		                {
		                    "first_letter": "Y",
		                    "view_spot_id": 3,
		                    "full_letter": "YUANMINGYUAN",
		                    "view_name": "圆明园"
		                }
		            ]
		        }
		    },
		    "prefix": "http://127.0.0.1/lx/",
		    "res_code": 200
		});
	}
}