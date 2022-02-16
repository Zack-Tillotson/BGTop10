import React from 'react';
import cn from 'classnames'
import {Link} from 'gatsby'

import Button from 'atoms/Button'

import './nav-menu-pane.scss'

const baseCn = 'nav-menu-pane'

function NavMenuPane({onClose}) {
  return (
    <div className={cn(baseCn)} role="document" tabIndex="0">
      <section className={`${baseCn}__section`}>
        <h3 className={`${baseCn}__section-header`}>Find a game</h3>
        <Button type="link" to="/search/" className="page-head-menu__item" primary wide onClick={onClose}>
          🔍  
          Search
        </Button>
      </section>
      <section className={`${baseCn}__section`}>
        <h3 className={`${baseCn}__section-header`}>More links</h3>
        <Link to="/about/" className="page-head-menu__item">About</Link>
      </section>
    </div>
  )

}

export default NavMenuPane