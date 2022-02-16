import React from 'react';
import {Link} from 'gatsby'
import cn from 'classnames'

import NavMenu from 'layout/NavMenu';

import logoTitle from 'images/rect-logo-title-120x30.png'
import './component.scss'

function Component({className, user}) {
  return (
    <div className={cn(className, 'page-head')}>
      <div className="page-head__content page__container">
        <Link to="/" className="page-head__logo">
          <img src={logoTitle} alt="BG Top 10" className="page-head__logo-title" width="125" height="30" />
        </Link>
        <NavMenu buttonProps={{children: "☰", className: "page-head-menu__toggle"}} />
      </div>
    </div>
  );
}

export default Component;