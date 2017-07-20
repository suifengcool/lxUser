module.exports = {
	api: '/guide/user/toReview',
	response: function(req, res) {
		res.json({
			state: 0,
			msg: '认证失败',
			realname: ''
		});
	}
}