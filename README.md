React Redux Substate
=========================

## Installation

React Redux Substate requires **React 0.14 or later.**
```npm install --save-dev react-redux-substate
```

## Usage

The example is based on Dan Abramov Redux Tutorials [(on egghead.io)](https://egghead.io/instructors/dan-abramov)

```js
// import mandatory functions
import { connectSubstate, reduceSubstate, substateReducer } from 'react-redux-substate'

// connect your component like you do with react-redux connect function (parameters are the same)
const TodoApp = connectSubstate()(() => {
	return (
		<div>
			<AddTodo />
			<VisibleTodoList />
			<Footer />
		</div>
	)
})

// create your reducer then wrap it in reduceSubstate
const todoApp = reduceSubstate(combineReducers({
		todos,
		visibilityFilter,
		// add this reducer at the end :
		_substates: substateReducer
}))

const store = createStore(todoApp)

ReactDOM.render(
		<Provider store={store}>
			<div>
				<TodoApp substateId="1" />
				<TodoApp substateId="2" />
			</div>
		</Provider>,
		document.getElementById('root')
)
```

## Documentation

### `connectSubstate([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`
This is a wrapper of the react-redux connection function.
Refer to the react-redux doc for more information : [`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`](docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

### `reduceSubstate()`
Wrap your reducer with this function so the state will be reduced to only the substate specified in the action.

## How Does It Work ?
`connectSubstate` will wrap your component (no injection) and act like a provider to give access to the substateId inside the context.
The `dispatch` method will be wrapped to add a substateId parameter to the action.
Then the reducer will get the substateId and reduce the state to only the part asked for the next reducers.

This is a very simple way to add substates to the components. It does not ensure fractality of the components because substates are stored in the app state.

## License

MIT