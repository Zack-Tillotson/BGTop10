import React from 'react';
import { PortalWithState } from 'react-portal';

import Button from 'atoms/Button'

import './portal-pane.scss'

const CLASS_PORTAL_OPEN = '--portal-open'

function getRootEle() {
  return document.getElementsByClassName('page')[0]
}

const DEFAULT_BUTTON_PROPS = {
  children: 'Add',
  primary: true,
}

function CreatorSelector(props) {
  const {buttonProps = {}, Child} = props
  const builtButtonProps = {...DEFAULT_BUTTON_PROPS, ...buttonProps}

  const handlePortalOpen = () => {
    getRootEle().classList.add(CLASS_PORTAL_OPEN)
    getRootEle().setAttribute('aria-hidden', true)
  }
  const handlePortalClose = () => {
    getRootEle().classList.remove(CLASS_PORTAL_OPEN)
    getRootEle().removeAttribute('aria-hidden')
  }
  return (
    <PortalWithState closeOnOutsideClick closeOnEsc onOpen={handlePortalOpen} onClose={handlePortalClose}>
      {({ openPortal, closePortal, portal }) => (
        <React.Fragment>
          <Button onClick={openPortal} {...builtButtonProps} />
          {portal(
            <Child onClose={closePortal} {...props} />
          )}
        </React.Fragment>
      )}
    </PortalWithState>
  )
}

export default CreatorSelector;