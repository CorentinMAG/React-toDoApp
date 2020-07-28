import {Todo} from './interfaces'

declare type ChangeCallback = ( store : TodoStore ) => void

export default class TodoStore {

	private static i = 0
	private callbacks: ChangeCallback[] = []
	public todos: Todo[] = []

	private static increment () {
		return this.i++
	}

	addTodo (title: string): void {
		this.todos = [{
			id:TodoStore.increment(),
			title:title,
			completed:false
		}, ...this.todos]
		this.inform()
	}

	removeTodo (todo: Todo): void {
		this.todos = this.todos.filter(t => t !== todo)
		this.inform()
	}

	toggleTodo (todo: Todo): void {
		this.todos = this.todos.map( t=> t === todo ? { ...t, completed: !t.completed } : t)
		this.inform()
	}

	updateTitle (todo: Todo, title: string): void {
		this.todos = this.todos.map( t=> t === todo ? { ...t, title } : t)
		this.inform()

	}
	toggleAll(completed = true) {
		this.todos = this.todos.map( t=> completed !== t.completed ? { ...t,completed } : t)
		this.inform()
	}

	clearCompleted (): void {
		this.todos = this.todos.filter(t => !t.completed )
		this.inform()

	}

	inform () {
		//on appelle chaque callback
		this.callbacks.forEach(cb => cb(this))
	}

	//le store informe le component qu'il y a eu des changements
	//enregistre le callback dans une liste
	onChange (cb: ChangeCallback) {
		this.callbacks.push(cb)

	}
}