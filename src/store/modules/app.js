import * as types from '../mutation-types'

const state = {
	userInfo: {
    	isLogin: false,
      birthday: '',
      gender: null,
      guide_status: null,
      id: null,
      introduce: '',
      real_name: '',
      user_status: null,
      resource_path: ''
  	}
}

const mutations = {
  	[types.SET_USER] (state, user) {
    	state.userInfo = user
  	},

  	[types.DELETE_USER] (state) {
   		state.userInfo.isLogin = false
    	state.userInfo.birthday = ''
      state.userInfo.gender = null
      state.userInfo.guideStatus = null
      state.userInfo.id = null
      state.userInfo.introduce = ''
      state.userInfo.real_name = ''
      state.userInfo.user_status = null
    	state.userInfo.resource_path = null
  	},
}

export default {
  	state,
  	mutations
}
