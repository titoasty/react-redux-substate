import React from 'react';
const { Component, PropTypes, Children, createElement } = React;
import { connect } from 'react-redux'
import hoistStatics from 'hoist-non-react-statics'
import { mergeSubstate, getSubstate } from '../util/substate'

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const defaultMapStateToProps = state => ({})
const defaultMapDispatchToProps = dispatch => ({ dispatch })

export default function connectSubstate(mapStateToProps = defaultMapStateToProps, mapDispatchToProps = defaultMapDispatchToProps, mergeProps = mergeSubstate, options = {}) {

	let mapStateToPropsSubstate = (state, ownProps) => {
		let substate = getSubstate(state, ownProps.substateId)

		return mapStateToProps(substate, ownProps)
	}

	let mapDispatchToPropsSubstate = (dispatch, ownProps) => {
		let localDispatch = function(action) {
			return dispatch({
					...action,
				_substate: ownProps.substateId
			})
		}

		return mapDispatchToProps(localDispatch, ownProps, dispatch)
	}

	return function wrapComponent(WrappedComponent) {
		WrappedComponent = connect(mapStateToPropsSubstate, mapDispatchToPropsSubstate, mergeSubstate)(WrappedComponent)

		class Substate extends Component {
			getChildContext() {
				return { substateId: this.substateId }
			}

			constructor(props, context) {
				super(props, context)
				this.substateId = props.substateId || context.substateId

				if (!this.substateId) {
					throw `Cannot find "substate" in either props or context of ${getDisplayName(WrappedComponent)}`
				}
			}

			render() {
				return createElement(WrappedComponent, {
						...this.props,
					substateId: this.substateId
			})
			}
		}
		Substate.contextTypes = {
			substateId: PropTypes.string
		}
		Substate.propTypes = {
			substateId: PropTypes.string
		}
		Substate.childContextTypes = {
			substateId: PropTypes.string.isRequired
		}

		return hoistStatics(Substate, WrappedComponent)
	}

}