import * as React from 'react'
import {ChangeEvent, useState,KeyboardEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Todo} from './interfaces'
import {add_todo} from './redux/actions_creator/action_creator'
import {TodoState} from './redux/reducers/reducers'

export function AddTodo () {
    const [ todo, setTodo] = useState('')
    const store = useSelector((state:TodoState) => state)
    const dispatch = useDispatch()

    const NewTodo = function(e:KeyboardEvent<HTMLInputElement>){
        if(e.key === 'Enter') {
            const newTodo: Todo = {
                id: store.todos.length,
                title: todo,
                completed: false
            }
            dispatch(add_todo(newTodo))
            setTodo('')
        }
    }
    const changeValue = function(e:ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        setTodo(e.target.value)
    }
    return <input className='new-todo'
                  value={todo}
                  onChange ={changeValue}
                  placeholder='What needs to be done?'
                  onKeyPress={NewTodo}
                  />
}
