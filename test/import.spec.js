import expect from 'expect'

import { connectSubstate, substateReducer, reduceSubstate } from '../src/index'

describe('Imports', () => {
	describe('connectSubstate', () => {
		it('should exist', () => {
			expect(connectSubstate.name).toEqual('connectSubstate')
			expect(connectSubstate).toExist()
		})
	})
	describe('substateReducer', () => {
		it('should exist', () => {
			expect(substateReducer.name).toEqual('substateReducer')
			expect(substateReducer).toExist()
		})
	})
	describe('reduceSubstate', () => {
		it('should exist', () => {
			expect(reduceSubstate.name).toEqual('reduceSubstate')
			expect(reduceSubstate).toExist()
		})
	})
})