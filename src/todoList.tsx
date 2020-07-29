import * as React from 'react'
import {ChangeEvent, MouseEvent} from 'react'
import {Todo} from './interfaces'
import TodoItem from './TodoItem'
import cx from 'classnames'
import {connect} from 'react-redux'
import {TodoState} from './redux/reducers/reducers'
import {AddTodo} from './AddTodo'
import {change_visibility, clear_completed, toggle_all} from './redux/actions_creator/action_creator'
import {FILTERS} from './redux/actions/actions'
import {StoreDispatch} from './redux/store/store'


interface TodoListProps {
	todos: Todo[]
	filter: FILTERS
	onChangeVisibility: (e:MouseEvent<HTMLElement>) => void
	onClearAll: (e:MouseEvent<HTMLButtonElement>) => void
	onToggleAll: (e:ChangeEvent<HTMLInputElement>) => void

}

const getVisibleTodos = (todos:Todo[], filter:FILTERS):Todo[] => {
	switch(filter){
		case 'All':
			return todos
		case 'Completed':
			return todos.filter(t => t.completed)
		case 'Active':
			return todos.filter(t => !t.completed)
		default:
			throw new Error('Filtre inconnus')
	}

}

const mapStateToProps = (state:TodoState) => {
	return {
		todos: getVisibleTodos(state.todos,state.filter),
		filter: state.filter
	}
}

const mapDispatchToProps = (dispatch: StoreDispatch,ownProps:TodoListProps) => {
	return {
		onChangeVisibility:(e:MouseEvent<HTMLElement>) => dispatch(change_visibility(e.target.textContent)),
		onClearAll:() => dispatch(clear_completed()),
		onToggleAll:() => dispatch(toggle_all())
	}
}

class TodoList extends React.PureComponent<TodoListProps,TodoState> {

	constructor (props:TodoListProps) {
		super(props)

	}

	get remainingCount (): number {
		return this.props.todos.reduce((count,todo) => !todo.completed ? count + 1 : count,0)
	}
	get completedCount (): number {
		return this.props.todos.reduce((count,todo) => todo.completed ? count + 1 : count,0)
	}

	render () {
		let remainingCount = this.remainingCount
		let completedCount = this.completedCount
		return <section className='todoapp'>
			<header className='header'>
				<h1>todos</h1>
				<AddTodo/>
			</header>
			<section className='main'>
				<input id='toggle-all' className='toggle-all' type='checkbox' checked={remainingCount === 0} onChange={this.props.onToggleAll}/>
				<label htmlFor='toggle-all'>Mark all as complete</label>
				<ul className='todo-list'>
				{this.props.todos.map( todo => {
					return <TodoItem key={todo.id} todo={todo} />
				})}
				</ul>
			</section>
			<footer className='footer'>
				{ this.remainingCount > 0 && <span className='todo-count'><strong>{remainingCount}</strong> item{remainingCount > 1 && 's'} left</span> }
				<ul className='filters'>
					<li>
						<a href='#/' className={cx({selected: this.props.filter === 'All'})} onClick={this.props.onChangeVisibility}>All</a>
					</li>
					<li>
						<a href='#/active' className={cx({selected: this.props.filter === 'Active'})} onClick={this.props.onChangeVisibility} >Active</a>
					</li>
					<li>
						<a href='#/completed' className={cx({selected: this.props.filter === 'Completed'})} onClick={this.props.onChangeVisibility}>Completed</a>
					</li>
				</ul>
				{completedCount > 0 && <button className='clear-completed' onClick={this.props.onClearAll}>Clear completed</button>}
			</footer>
		</section>
	}
}
const list = connect(mapStateToProps,mapDispatchToProps)(TodoList)
export default list
