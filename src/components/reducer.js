const substateReducer = (state = {}) => { return state }

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

const reduceSubstate = (reducer) => {
	return (state, action) => {
		let substateId = action._substateId

		if(substateId) {
			if(!hasSubstate(state, substateId)) {
				state = createSubstate(state, substateId)
			}

			let substate = getSubstate(state, substateId)

			state = {...state}
			state._substates[substateId] = reducer(substate, action)

			return state
		} else {
			return reducer(state, action)
		}
	}
}

export { reduceSubstate, substateReducer }