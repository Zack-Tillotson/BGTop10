import React from 'react';

import CreatorSelectorPane from './components/CreatorSelectorPane'
import PortalPane from 'layout/PortalPane'

function CreatorSelector(props) {
  return <PortalPane Child={CreatorSelectorPane} {...props} />
}

export default CreatorSelector;