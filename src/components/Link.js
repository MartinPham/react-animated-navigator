import React from 'react';
import {createLocation} from 'history';
import useNavigator from '../hooks/useNavigator';

export const resolveToLocation = (to, currentLocation) =>
  typeof to === "function" ? to(currentLocation) : to;

export const normalizeToLocation = (to, currentLocation) => {
  return typeof to === "string"
    ? createLocation(to, null, null, currentLocation)
    : to;
};

export default ({to, transition = 'none', duration = 0, children, tag: Tag = "a", ...props}) => {
	const [go, location, history] = useNavigator()

	let finalProps = props


	const handleClick = (finalTo, event) => {
		event.preventDefault()

		go(finalTo, transition, duration)
	}


	let finalTo = to

	if(Tag.toLowerCase() === 'a')
	{
		if(typeof to === 'number')
		{

		} else if(typeof to === 'object')
		{
			const newLocation = {...location}

			const normalizedLocation = 
				normalizeToLocation(
					resolveToLocation(
						{
							...newLocation, 
							...to
						}, 
						newLocation
					),
					newLocation
				)

			finalProps.href = normalizedLocation ? history.createHref(normalizedLocation) : ''
		} else if(typeof to === 'function')
		{
			const newLocation = {...location}
			
			finalTo = finalProps.href = to(newLocation)
		} else {
			finalProps.href = to
		}
	}

	return (
		<Tag onClick={e => handleClick(finalTo, e)} {...finalProps}>{children}</Tag>
	)
}