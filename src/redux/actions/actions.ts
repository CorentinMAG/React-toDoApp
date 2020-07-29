import {Todo} from '../../interfaces'

export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const TOGGLE_ALL = 'TOGGLE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

interface addTodo {
	type: typeof ADD_TODO
	todo: Todo
}

interface removeTodo {
	type: typeof DELETE_TODO
	todo: Todo
}

interface toggleTodo {
	type: typeof TOGGLE_TODO,
	todo: Todo
}

interface updateTitle {
	type: typeof UPDATE_TODO,
	todo: Todo,
	title: string
}

interface toggleAll {
	type: typeof TOGGLE_ALL
}

interface clearCompleted {
	type: typeof CLEAR_COMPLETED
}

interface VisibilityFilter {
	type: typeof SET_VISIBILITY_FILTER,
	filter: FILTERS
}

export type FILTERS = 'All' | 'Completed' | 'Active'


export type ActionTypes = addTodo | removeTodo | toggleTodo | updateTitle | toggleAll | clearCompleted | VisibilityFilter
