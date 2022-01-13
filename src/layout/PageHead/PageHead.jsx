import React, {useState} from 'react';
import {Link} from 'gatsby'
import cn from 'classnames'

import Button from 'atoms/Button'

import './component.scss'

import logoTitle from 'images/rect-logo-title-120x30.png'

function Component({className, user}) {
  const [isMenuOpen, updateIsMenuOpen] = useState(false)

  const handleMenuToggleClick = event => {
    updateIsMenuOpen(!isMenuOpen)
    if(window.matchMedia("(max-width: 800px)").matches) {
      window.scrollTo(0,0)
    }
  }

  const handleMenuBackgroundClick = event => {
    updateIsMenuOpen(false)
  }

  return (
    <div className={cn(className, 'page-head')}>
      <div className="page-head__content page__container">
        <Link to="/" className="page-head__logo">
          <img src={logoTitle} alt="BG Top 10" className="page-head__logo-title" width="125" height="30" />
        </Link>
        <div className="page-head__menu-container page-head-menu">
          <div className={cn('page-head-menu__background', {['page-head-menu__background--open']: isMenuOpen})} onClick={handleMenuBackgroundClick}> </div>
          <Button className="page-head-menu__toggle" onClick={handleMenuToggleClick}>
            {isMenuOpen ? '✖' : '☰'}
          </Button>
          <div className={cn('page-head-menu__menu', {['page-head-menu__menu--open']: isMenuOpen})}>
            <Link to="/about/" className="page-head-menu__item">About</Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;