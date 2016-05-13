import { hasSubstate, createSubstate, getSubstate } from '../util/substate'

const substateReducer = (state = {}) => { return state }

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