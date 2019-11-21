import React from 'react';
import useNavigator from '../hooks/useNavigator';

export default (Component) => {

	const displayName = `withNavigator(${Component.displayName || Component.name})`

	const WrappedComponent = (props) => {
		const [go, location, history] = useNavigator()
		
		return (
			<Component go={go} location={location} history={history} {...props}/>
		)
	}
	WrappedComponent.displayName = displayName

	return WrappedComponent
}