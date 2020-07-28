import * as React from 'react'
import {MouseEvent,FormEvent,KeyboardEvent} from 'react'
import {Todo} from './interfaces'
import  cx from 'classnames'

interface Props {
	todo: Todo
	onToggle: (todo: Todo) => void
	onDestroy: (todo: Todo) => void
	onUpdate: (todo: Todo, title: string) => void
}

interface State {
	editing: boolean
	title: string
}

//ne fait des render que si des props ou le state est changé
export default class TodoItem extends React.PureComponent<Props,State> {
	//la classe completed est activé si this.props.todo.completed = true
	constructor(props:Props){
		super(props)
		this.state = {
			editing: false,
			title:''
		}
	}
	render () {
		let { editing , title} = this.state
		return <li data-id='1595950496588' className={cx({completed:this.props.todo.completed,editing})}>
					<div className='view'>
						<input className='toggle' type='checkbox' onChange={this.toggle} checked={this.props.todo.completed}/>
						<label onDoubleClick={this.startEditing}>{this.props.todo.title}</label>
						<button className='destroy' onClick={this.destroy}></button>
					</div>
					<input type='text' 
						className='edit' 
						value={title} 
						onBlur={this.handleSubmit} 
						onKeyDown={this.handleKeyDown}
						onInput={this.handleInput}/>
				</li>
	}

	toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onToggle(this.props.todo)

	}
	destroy = (e: MouseEvent<HTMLButtonElement>) => {
		this.props.onDestroy(this.props.todo)

	}
	startEditing = (e: MouseEvent<HTMLLabelElement>) => {
		this.setState({editing:true,title:this.props.todo.title})
	}
	handleInput = (e:FormEvent<HTMLInputElement>) => {
		this.setState({title:(e.target as HTMLInputElement).value})

	}
	handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
		if(e.key === 'Escape'){
			this.setState({editing:false})
		}else if(e.key === 'Enter'){
			this.handleSubmit()

		}
		
	}
	handleSubmit = () => {
		this.props.onUpdate(this.props.todo,this.state.title)
		this.setState({editing: false})

	}
}