import produce from 'immer';

export default (state, action) => {
	// console.warn(action)
	switch (action.type) {
        case 'PUSH':
			const {transition, duration} = action.payload

            return produce(state, draftState => {
				draftState.transition = transition
				draftState.duration = duration
			})
        case 'RESET_STACK':
			return produce(state, draftState => {
				const location = {...action.payload.location}
				location.key = location.key || ''
				draftState.stack = [location]
				draftState.location = location
			})
        case 'UPDATE_STACK':
            return produce(state, draftState => {
				const location = {...action.payload.location}
				location.key = location.key || ''

				draftState.location = location

				const currentStack = state.stack
				const currentLocation = state.location
				const currentTransition = state.transition
				const currentDuration = state.duration
	
				const currentLocationIndex = currentStack.findIndex(stackItem => currentLocation.key === stackItem.key)
				const existedLocationIndex = currentStack.findIndex(stackItem => draftState.location.key === stackItem.key)

				if(existedLocationIndex === -1)
				{
					draftState.stack = currentStack.slice(0, currentLocationIndex + 1)
			
			
					draftState.location.__transition = currentTransition
					draftState.location.__duration = currentDuration
			
			
					draftState.stack.push(draftState.location);
			
			
					draftState.direction = 'forward'
				} else {
					if(existedLocationIndex < currentLocationIndex)
					{

						draftState.direction = 'back'
			
						const nextOfExistedLocation = currentStack[existedLocationIndex + 1]
			
						draftState.transition = nextOfExistedLocation.__transition
						draftState.duration = nextOfExistedLocation.__duration
			
					} else {

						draftState.direction = 'forward';
			
			
						const existedLocation = currentStack[existedLocationIndex]
			
						draftState.transition = existedLocation.__transition
						draftState.duration = existedLocation.__duration
			
					}
			
				}
			})
	  	default:
			return state;
	}
}