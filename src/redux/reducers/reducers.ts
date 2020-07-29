import {Todo} from '../../interfaces'
import {
	ActionTypes,
	ADD_TODO,
	CLEAR_COMPLETED,
	DELETE_TODO,
	FILTERS,
	SET_VISIBILITY_FILTER,
	TOGGLE_ALL,
	TOGGLE_TODO,
	UPDATE_TODO,
} from '../actions/actions'


export interface TodoState {
	todos : Todo[],
	filter: FILTERS
}


const initialState: TodoState = {
	todos:[] as Todo[],
	filter:'All' as FILTERS
}

function MyReducer (state = initialState, action: ActionTypes): TodoState {
	switch(action.type) {
		case ADD_TODO:
			return Object.assign( {}, state, {
				todos:[action.todo, ...state.todos]
			})
		case DELETE_TODO:
			return Object.assign({},state,{
				todos: state.todos.filter(t => t !== action.todo)
			})
		case UPDATE_TODO:
			return Object.assign({},state,{
				todos: state.todos.map( t => t === action.todo ? { ...t, title:action.title } : t)
			})
		case CLEAR_COMPLETED:
			return Object.assign({},state,{
				todos: state.todos.filter(t => !t.completed )
			})
		case TOGGLE_ALL:
			return Object.assign({},state,{
				todos: state.todos.map( t => !t.completed ? { ...t,completed:true } : t)
			})
		case TOGGLE_TODO:
			return Object.assign({}, state, {
				todos: state.todos.map(t=> t === action.todo ? { ...t, completed: !t.completed } : t)
			})
		case SET_VISIBILITY_FILTER:
			return Object.assign({},state,{
				filter: action.filter
			})
		default:
		 return state
	}
}

export default MyReducer
