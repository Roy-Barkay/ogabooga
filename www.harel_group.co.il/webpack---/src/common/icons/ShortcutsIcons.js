import React from 'react'
import { ReactComponent as ShortcutsIcons } from './shortcuts.svg'

function ShortcutsSpriteSVG(props){
	return (
		<div style={{height: 0, width: 0, position: 'absolute', visibility: 'hidden'}}>
			<ShortcutsIcons />
		</div>
	);
}

export default ShortcutsSpriteSVG;