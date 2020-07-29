import * as React from 'react'
import {MouseEvent, FormEvent, KeyboardEvent, ChangeEvent} from 'react'
import {Todo} from './interfaces'
import  cx from 'classnames'
import {remove_todo, toggle_todo, update_title} from './redux/actions_creator/action_creator'
import {connect} from 'react-redux'
import {StoreDispatch} from './redux/store/store'

interface Props {
	todo: Todo
	onToggle: (e: ChangeEvent<HTMLInputElement>) => void
	onDestroy: (e:MouseEvent<HTMLElement>) => void
	onUpdate: (todo:Todo,title:string) => void
}

interface State {
	editing: boolean
	title: string
}


const mapDispatchToProps = (dispatch: StoreDispatch,ownProps:Props) => {
	return {
		onDestroy:() => dispatch(remove_todo(ownProps.todo)),
		onToggle:() => dispatch(toggle_todo(ownProps.todo)),
		onUpdate:(todo:Todo,title:string) => dispatch(update_title(ownProps.todo,title)),
	}
}

//ne fait des render que si des props ou le state est changé
class TodoItem extends React.PureComponent<Props,State> {
	//la classe completed est activé si this.props.todo.completed = true
	constructor(props:Props){
		super(props)
		this.state = {
			editing: false,
			title: ''
		}
	}
	render () {
		let { todo } = this.props
		let {editing, title } = this.state
		return <li data-id='1595950496588' className={cx({completed:todo.completed,editing})}>
					<div className='view'>
						<input className='toggle' type='checkbox' onChange={this.props.onToggle} checked={todo.completed}/>
						<label onDoubleClick={this.startEditing}>{todo.title}</label>
						<button className='destroy' onClick={this.props.onDestroy}>&nbsp;</button>
					</div>
					<input type='text' 
						className='edit' 
						value={title} 
						onBlur={this.handleSubmit}
						onKeyDown={this.handleKeyDown}
						onInput={this.handleInput}/>
				</li>
	}

	startEditing = () => {
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

const item = connect(null,mapDispatchToProps)(TodoItem)
export default item
