import * as types from './mutation-types'

export const setUser = ({ commit }, user) => commit(types.SET_USER, user)

export const deleteUser = ({ commit }) => commit(types.DELETE_USER)

