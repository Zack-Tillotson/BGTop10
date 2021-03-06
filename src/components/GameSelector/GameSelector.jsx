import React from 'react';

import GameSelectorPane from './components/GameSelectorPane'
import PortalPane from 'layout/PortalPane'

function CreatorSelector(props) {
  return <PortalPane Child={GameSelectorPane} {...props} />
}

export default CreatorSelector;