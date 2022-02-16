import React from 'react';

import NavMenuPane from './components/NavMenuPane'
import PortalPane from 'layout/PortalPane'

function NavMenu(props) {
  return <PortalPane Child={NavMenuPane} {...props} />
}

export default NavMenu;