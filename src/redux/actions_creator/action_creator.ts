import {
	ActionTypes,
	ADD_TODO,
	CLEAR_COMPLETED,
	DELETE_TODO,
	FILTERS,
	SET_VISIBILITY_FILTER,
	TOGGLE_ALL,
	TOGGLE_TODO,
	UPDATE_TODO
} from '../actions/actions'

import {Todo} from '../../interfaces'


export const add_todo = (todo: Todo): ActionTypes => {
	return {
		type: ADD_TODO,
		todo
	}	
}

export const remove_todo = (todo: Todo): ActionTypes => {
	return {
		type: DELETE_TODO,
		todo
	}
}

export const update_title = (todo: Todo, title: string ): ActionTypes => {
	return {
		type: UPDATE_TODO,
		todo,
		title,
	}
}

export const clear_completed = (): ActionTypes => {
	return {
		type: CLEAR_COMPLETED,
	}
}

export const toggle_all = (): ActionTypes => {
	return {
		type: TOGGLE_ALL
	}
}

export const toggle_todo = (todo: Todo): ActionTypes => {
	return {
		type: TOGGLE_TODO,
		todo
	}
}

export const change_visibility = (filter: FILTERS): ActionTypes => {
	return {
		type: SET_VISIBILITY_FILTER,
		filter
	}
}
