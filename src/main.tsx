import {render} from 'react-dom'
import * as React from 'react'
import TodoList from './TodoList'
import store from './redux/store/store'
import {Provider} from 'react-redux'


render(
	<Provider store={store}>
		<TodoList/>
	</Provider>,
	document.getElementById('app')
	)