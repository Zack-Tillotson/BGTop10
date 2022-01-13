import React, { useEffect } from 'react'
import cn from 'classnames'
import { Helmet } from 'react-helmet'
import {Link} from 'gatsby'

import PageHead from '../PageHead'
import Breadcrumbs from '../Breadcrumbs'

import './component.scss'
import imageIcon from 'images/square-logo-64x64.png'

function Component({ 
  isHeadShown = true, 
  className, 
  children,
  location,
  crumbs = [],
  Ele = 'main',
  ...rest
}) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Ele className="page" {...rest}>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href="/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:400,700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#77c40d" />
        <meta name="description" content="A site for those who love board games and love board game top 10 lists." />
        <link rel="apple-touch-icon" href="/icon.png" />
      </Helmet>
      {isHeadShown && (
        <PageHead className="page__head" />
      )}
      <div className={cn('page__content', 'page__container', className)}>
        <Breadcrumbs locations={crumbs} />
        {children}
      </div>
      <div className="page__foot">
        <div className="page__container page__foot-links">
          <Link href="/"><img className="page__foot-logo" src={imageIcon} alt="Cardboard Salad logo" /></Link>
          <Link href="/terms-of-use">Terms of Use</Link>
          <Link href="/contact-us">Contact Us</Link>
          <span>© Cardboard SALAD</span>
          <a href="https://zacherytillotson-com.web.app">© Zachery Tillotson</a>
        </div>
      </div>
    </Ele>
  );
}

export default Component;