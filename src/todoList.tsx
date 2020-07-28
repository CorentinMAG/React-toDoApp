import * as React from 'react'
import {FormEvent,KeyboardEvent,MouseEvent} from 'react'
import TodoStore from './TodoStore'
import {Todo} from './interfaces'
import TodoItem from './TodoItem'
import cx from 'classnames'


type FilterOptions = 'all' | 'active' | 'completed' 

const FILTERS = {
	completed : (todo: Todo) => todo.completed,
	active : (todo : Todo) => !todo.completed,
	all : (todo: Todo) => true

}


interface TodoListProps {

}

interface TodoListState {
	todos: Todo[]
	newTodo: string
	filter: FilterOptions
}

export default class TodoList extends React.PureComponent<TodoListProps,TodoListState> {

	private store: TodoStore = new TodoStore()

	private toggleTodo: (todo: Todo) => void
	private destroyTodo: (todo: Todo) => void
	private updateTitle: (todo: Todo, title: string) => void
	private clearCompleted: () => void
	constructor (props:TodoListProps) {
		super(props)
		this.state = {
			todos: [],
			newTodo: '',
			filter: 'all'
		}
		//on souscrit aux évolutions du store
		this.store.onChange((store) => {
			this.setState({ todos: store.todos })
		})
		//lorqu'une méthode du store est appelé, le store est updaté mais pas le component
		//c'est pourquoi on utilise store.onChange et store.inform()
		this.destroyTodo = this.store.removeTodo.bind(this.store) 
		this.toggleTodo = this.store.toggleTodo.bind(this.store)
		this.clearCompleted = this.store.clearCompleted.bind(this.store)
		this.updateTitle = this.store.updateTitle.bind(this.store)
	}
	componentDidMount () {
		this.store.addTodo('Bonjour les gens')
		this.store.addTodo('Comment allez vous')
	}

	get remainingCount (): number {
		return this.state.todos.reduce((count,todo) => !todo.completed ? count + 1 : count,0)
	}
	get completedCount (): number {
		return this.state.todos.reduce((count,todo) => todo.completed ? count + 1 : count,0)

	}
	updateNewTodo = (e: FormEvent<HTMLInputElement>) => {
		this.setState({ newTodo: (e.target as HTMLInputElement).value})

	}
	addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
		if(e.key === 'Enter') {
			this.store.addTodo(this.state.newTodo)
			this.setState({ newTodo: '' })
		}

	}

	toggle = (e: FormEvent<HTMLInputElement>) => {
		this.store.toggleAll(this.remainingCount>0)

	}
	setFilter = (filter: FilterOptions) => {
		return(e: MouseEvent<HTMLElement>) => {
			this.setState({filter: filter})
		}

	}
	render () {
		let remainingCount = this.remainingCount
		let completedCount = this.completedCount
		let todosFiltered = this.state.todos.filter(FILTERS[this.state.filter])
		return <section className='todoapp'>
			<header className='header'>
				<h1>todos</h1>
				<input className='new-todo' 
				value={this.state.newTodo}
				placeholder='What needs to be done?' 
				onInput={this.updateNewTodo}
				onKeyPress={this.addTodo}/>
			</header>
			<section className='main'>
				<input id='toggle-all' className='toggle-all' type='checkbox' checked={remainingCount === 0} onChange={this.toggle}/>
				<label htmlFor='toggle-all'>Mark all as complete</label>
				<ul className='todo-list'>
				{todosFiltered.map( todo => {
					return <TodoItem key={todo.id} todo={todo} onToggle={this.toggleTodo} onDestroy={this.destroyTodo} onUpdate={this.updateTitle}/>
				})}
				</ul>
			</section>
			<footer className='footer'>
				{ this.remainingCount > 0 && <span className='todo-count'><strong>{remainingCount}</strong> item{remainingCount > 1 && 's'} left</span> }
				<ul className='filters'>
					<li>
						<a href='#/' className={cx({selected: this.state.filter === 'all'})} onClick={this.setFilter('all')}>All</a>
					</li>
					<li>
						<a href='#/active' className={cx({selected: this.state.filter === 'active'})} onClick={this.setFilter('active')}>Active</a>
					</li>
					<li>
						<a href='#/completed' className={cx({selected: this.state.filter === 'completed'})} onClick={this.setFilter('completed')}>Completed</a>
					</li>
				</ul>
				{completedCount > 0 && <button className='clear-completed' onClick={this.clearCompleted}>Clear completed</button>}
			</footer>
		</section>
	}
}