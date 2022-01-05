import React, {useState} from 'react';

import cn from 'classnames'
import {Link} from 'gatsby'

import Button from 'atoms/Button'

import './component.scss'

import logoTitle from 'images/bgtop10-logo.png'

function Component({className, user}) {
  const [isMenuOpen, updateIsMenuOpen] = useState(false)

  const handleMenuToggleClick = event => {
    updateIsMenuOpen(!isMenuOpen)
    if(window.matchMedia("(max-width: 800px)").matches) {
      window.scrollTo(0,0)
    }
  }

  // const handleMenuBackgroundClick = event => {
  //   updateIsMenuOpen(false)
  // }

  // const handleLogOutClick = event => {
  //   updateIsMenuOpen(false)
  //   // logout() // xxx
  // }

  return (
    <div className={cn(className, 'page-head')}>
      <div className="page-head__content page__container">
        <Link to="/" className="page-head__logo">
          <img src={logoTitle} alt="BG Top 10" className="page-head__logo-title" width="125" height="30" />
        </Link>
        {/* <div className="page-head__menu-container page-head-menu">
          <div className={cn('page-head-menu__background', {['page-head-menu__background--open']: isMenuOpen})} onClick={handleMenuBackgroundClick}> </div>
          <Button className="page-head-menu__toggle" onClick={handleMenuToggleClick}>
            {isMenuOpen ? '✖' : '☰'}
          </Button>
          <div className={cn('page-head-menu__menu', {['page-head-menu__menu--open']: isMenuOpen})}>
            {!!user && (
              <div>
                <h3>User</h3>
                {user.displayName && (<div className="page-head-menu__item">{user.displayName}</div>)}
                {user.email && (<div className="page-head-menu__item">{user.email}</div>)}
                <button className="page-head-menu__item" onClick={handleLogOutClick}>Log out</button>
                <hr />
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Component;