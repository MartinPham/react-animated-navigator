import React, {useReducer, useEffect} from 'react';
import {Switch, withRouter} from 'react-router';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import reducer from './reducer';
import NavigatorContext from './context';
import styles from './styles.module.scss';

const initialState = {
	stack: [],
	location: null,
	direction: 'forward',
	transition: 'none',
	duration: 0,
}

let currentTransition = initialState.transition
let ghostLayer = null
let ghostLayerBackground = null
let ghostLayerElements = null
let lastSharedElements = []

const getBoundingRect = (node) => {
	/*
	let boundingRect = node.getBoundingClientRect();
	boundingRect = JSON.parse(JSON.stringify(boundingRect));

	return boundingRect;
	*/
	let element = node
	let offsetLeft = 0
	let offsetTop  = 0

	do{
		offsetLeft += element.offsetLeft
		offsetTop  += element.offsetTop

		element = element.offsetParent
	} while(element)

	return {
		top: offsetTop,
		left: offsetLeft,
		width: node.offsetWidth,
		height: node.offsetHeight
	}

}

export default withRouter(({children, history, extraClassNames = null, defaultDuration = 400, ...props}) => {
	const [state, dispatcher] = useReducer(reducer, initialState)


	const effectDependencies = [history]

	let _extraClassNames = extraClassNames || {}

	// console.error(styles)

	if(extraClassNames !== null)
	{
		effectDependencies.push(_extraClassNames)
	}



	useEffect(() => {

		ghostLayer = document.createElement('div')
		ghostLayer.className = `${styles.NavigatorSharedElementTransitionGhost} ${_extraClassNames.NavigatorSharedElementTransitionGhost || ''}`.replace(/  /g, ' ').trim()

		ghostLayerBackground = document.createElement('div')
		ghostLayerBackground.className = `${styles.NavigatorSharedElementTransitionGhostBackground} ${_extraClassNames.NavigatorSharedElementTransitionGhostBackground || ''}`.replace(/  /g, ' ').trim()
		ghostLayer.appendChild(ghostLayerBackground)
		
		ghostLayerElements = document.createElement('div')
		ghostLayerElements.className = `${styles.NavigatorSharedElementTransitionGhostElements} ${_extraClassNames.NavigatorSharedElementTransitionGhostElements || ''}`.replace(/  /g, ' ').trim()
		ghostLayer.appendChild(ghostLayerElements)


		document.body.appendChild(ghostLayer)


		dispatcher({
			type: 'RESET_STACK',
			payload: {
				location: history.location
			}
		})

		const unlisten = history.listen(location => {
			dispatcher({
				type: 'UPDATE_STACK',
				payload: {
					location
				}
			})
		})


		return () => {
			document.body.removeChild(ghostLayer)
			unlisten()
		}
	}, effectDependencies)

	const context = [
		(to, transition = null, duration = 0) => {
			if(typeof to === 'number')
			{
				history.go(to)
			} else {

				if(!transition)
				{
					transition = 'none'
				}
				if(transition !== 'none' && !duration)
				{
					duration = defaultDuration
				}
	
				dispatcher({
					type: 'PUSH',
					payload: {
						to,
						transition,
						duration
					}
				})

				history.push(to)
			}
			
		},
		state.location,
		history
	]

	const {location, transition, direction, duration} = state

	if(location === null) return null

	currentTransition = transition

	// console.warn(`${transition}-${direction}`)

	return (
		<NavigatorContext.Provider value={context}>
			<TransitionGroup 
				className={`${styles.NavigatorTransitionGroup} ${styles[`${transition}-${direction}`] || ''} ${_extraClassNames.NavigatorTransitionGroup || ''} ${_extraClassNames[`${transition}-${direction}`] || ''}`.replace(/  /g, ' ').trim()}
			>
				<CSSTransition
					key={location.key}
					timeout={duration || defaultDuration}
					classNames={{
						appear: `${styles['pageTransition-appear'] || ''} ${_extraClassNames['pageTransition-appear'] || ''}`.replace(/  /g, ' ').trim(),
						appearActive: `${styles['pageTransition-appear-active'] || ''} ${_extraClassNames['pageTransition-appear-active'] || ''}`.replace(/  /g, ' ').trim(),
						appearDone: styles['pageTransition-appear-done'], //`${styles['pageTransition-appear-done'] || ''} ${_extraClassNames['pageTransition-appear-done'] || ''}`,
						enter: `${styles['pageTransition-enter'] || ''} ${_extraClassNames['pageTransition-enter'] || ''}`.replace(/  /g, ' ').trim(),
						enterActive: `${styles['pageTransition-enter-active'] || ''} ${_extraClassNames['pageTransition-enter-active'] || ''}`.replace(/  /g, ' ').trim(),
						enterDone: styles['pageTransition-enter-done'], //`${styles['pageTransition-enter-done'] || ''} ${_extraClassNames['pageTransition-enter-done'] || ''}`,
						exit: `${styles['pageTransition-exit'] || ''} ${_extraClassNames['pageTransition-exit'] || ''}`.replace(/  /g, ' ').trim(),
						exitActive: `${styles['pageTransition-exit-active'] || ''} ${_extraClassNames['pageTransition-exit-active'] || ''}`.replace(/  /g, ' ').trim(),
						exitDone: styles['pageTransition-exit-done'], //`${styles['pageTransition-exit-done'] || ''} ${_extraClassNames['pageTransition-exit-done'] || ''}`,
					}}
					mountOnEnter={false}
					unmountOnExit={false}


					onExit={html => {



						if(currentTransition !== 'none') return;

						const shareds = html.querySelectorAll('*[data-shared-element="1"]')
				
				
						if(shareds.length > 0)
						{
							const positions = [];
					
							shareds.forEach(shared => {
								const key = shared.dataset.key
					
								const rect = getBoundingRect(shared)
					
								positions[key] = rect
							})
					
					
							ghostLayerElements.innerHTML = ''
							ghostLayerBackground.style.opacity = 1
							ghostLayer.style.display = 'block'
					
							shareds.forEach(sharedOriginal => {
								const shared = sharedOriginal.cloneNode(true)
								const key = shared.dataset.key
					
								const rect = positions[key]
					
								// console.error('>>> from', key, rect)
					
								shared.style.position = 'absolute'
								shared.style.transition = 'all 300ms'
								shared.style.top = rect.top + 'px'
								shared.style.left = rect.left + 'px'
								shared.style.width = rect.width + 'px'
								shared.style.height = rect.height + 'px'
								shared.style.margin = 0
					
					
								lastSharedElements[key] = shared
					
								ghostLayerElements.appendChild(shared)

								sharedOriginal.style.visibility = 'hidden'
							})
						}
				
					}}


					onEntering={html => {

						if(currentTransition === 'none') 
						{
							if(Object.keys(lastSharedElements).length > 0)
							{
								Object.keys(lastSharedElements).forEach(key => {
									const shared = html.querySelector(`*[data-key="${key}"]`)

									if(!shared)
									{
										ghostLayerElements.removeChild(lastSharedElements[key])
									}
								})

								const shareds = html.querySelectorAll('*[data-shared-element="1"]')
								if(shareds.length > 0)
								{
									const positions = [];
						
									shareds.forEach(shared => {
										const key = shared.dataset.key
							
										const rect = getBoundingRect(shared)
							
										positions[key] = rect

										// console.error('>>> to', key, rect)
									})

										shareds.forEach(shared => {
											const key = shared.dataset.key
								
											const rect = positions[key]

											// console.warn(shared, key, rect)
								
											if(lastSharedElements[key])
											{
												lastSharedElements[key].style.position = 'absolute'
												lastSharedElements[key].style.top = rect.top + 'px'
												lastSharedElements[key].style.backgroundImage = shared.style.backgroundImage;
												lastSharedElements[key].style.backgroundColor = shared.style.backgroundColor;
												lastSharedElements[key].style.borderRadius = shared.style.borderRadius;
												lastSharedElements[key].style.color = shared.style.color;
												lastSharedElements[key].style.fontWeight = shared.style.fontWeight;
												lastSharedElements[key].style.fontSize = shared.style.fontSize;
												lastSharedElements[key].style.padding = shared.style.padding;
												lastSharedElements[key].style.opacity = shared.style.opacity;
												lastSharedElements[key].style.textShadow = shared.style.textShadow;
												lastSharedElements[key].style.transform = shared.style.transform;
												lastSharedElements[key].style.filter = shared.style.filter;
												lastSharedElements[key].style.textAlign = shared.style.textAlign;
												lastSharedElements[key].style.left = rect.left + 'px'
												lastSharedElements[key].style.width = rect.width + 'px'
												lastSharedElements[key].style.height = rect.height + 'px'
												lastSharedElements[key].style.margin = 0
	
												shared.style.visibility = 'hidden'
											}
										})
									
									
								}
							}
						}
					}}
					
					onEntered={html => {

						if(currentTransition === 'none') 
						{
							ghostLayerBackground.style.opacity = 0

							if(Object.keys(lastSharedElements).length > 0)
							{
								const shareds = html.querySelectorAll('*[data-shared-element="1"]')
								if(shareds.length > 0)
								{
									shareds.forEach(shared => {
										const key = shared.dataset.key
							
										if(lastSharedElements[key])
										{
											shared.style.visibility = 'visible'
										}
									})
								}
							}

							setTimeout(() => {
								ghostLayer.style.display = 'none'
								ghostLayerElements.innerHTML = ''
							}, 110)
						}

					}}

				>
					<div className={`${styles.NavigatorTransition} ${_extraClassNames.NavigatorTransition || ''}`.replace(/  /g, ' ').trim()}>
						<Switch location={location}>
							{children}
						</Switch>
					</div>
				</CSSTransition>
			</TransitionGroup>
		</NavigatorContext.Provider>
	)
})