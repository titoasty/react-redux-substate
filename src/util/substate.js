const mergeSubstate = (stateProps, dispatchProps, ownProps) => {
	var props = 	{
		...stateProps,
		...dispatchProps,
		...ownProps
	}

	let globalDispatch = props.dispatch
	let localDispatch = function(action) {
		return globalDispatch({
			...action,
			_substateId: props.substateId
		})
	}

	return {
		...props,
		dispatch: localDispatch,
		globalDispatch
	}
}

const hasSubstate = (state = null, substateId = null) => {
	return state != null && substateId != null && state._substates && state._substates[substateId]
}

const createSubstate = (state = null, substateId = null) => {
	if(state == null || substateId == null) {
		return state
	}

	// ensure immutability
	state = { ...state }
	state._substates[substateId] = {}

	return state
}

const getSubstate = (state, substateId = null) => {
	if(!hasSubstate(state, substateId)) {
		return state
	}

	return state._substates[substateId]
}

export { mergeSubstate, hasSubstate, createSubstate, getSubstate }