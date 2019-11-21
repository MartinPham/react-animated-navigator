import React from 'react';

export default class SharedElement extends React.Component {
	shouldComponentUpdate()
	{
		return false
	}

	render()
	{
		if(this.props.id === void 0)
		{
			throw new Error('SharedElement requires "key" prop')
		}

		let element = null
		let count = 0

		React.Children.forEach(this.props.children, child => {
			if(React.isValidElement(child))
			{
				count++

				if(count >= 2)
				{
					throw new Error('SharedElement only support 1 child node')
				}

				element = React.cloneElement(child, {
					'data-shared-element': 1,
					'data-key': this.props.id
				})
			}
		})

		return element
	}
}
