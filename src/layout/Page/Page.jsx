import React, { useEffect } from 'react'
import cn from 'classnames'
import { Helmet } from 'react-helmet'
import {Link} from 'gatsby'

import PageHead from '../PageHead'

import './component.scss'
import imageFavicon from 'images/square-logo-16x16.png'
import imageIcon from 'images/square-logo-64x64.png'
import imageApplIcon from 'images/square-logo-192x192.png'

function Component({ 
  isHeadShown = true, 
  className, 
  children,
  location,
  Ele = 'main',
  ...rest
}) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Ele className="page" {...rest}>
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}>
        <meta charset="utf-8" />
        <link rel="icon" href={imageFavicon} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:400,700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#77c40d" />
        <meta name="description" content="A site for those who love board games and love board game top 10 lists." />
        <link rel="apple-touch-icon" href={imageApplIcon} />
        <meta http-equiv='content-language' content='en-US' />
      </Helmet>
      {isHeadShown && (
        <PageHead className="page__head" />
      )}
      <div className={cn('page__content', 'page__container', className)}>
        {children}
      </div>
      <div className="page__foot">
        <div className="page__container page__foot-links">
          <Link to="/"><img className="page__foot-logo" src={imageIcon} alt="Cardboard Salad logo" /></Link>
          <Link to="/about">About</Link>
          <Link to="/privacy-policy">Privacy policy</Link>
          <Link to="/contact-us">Contact us</Link>
          <span>© Cardboard SALAD</span>
          <a href="https://zacherytillotson-com.web.app">© Zachery Tillotson</a>
        </div>
      </div>
    </Ele>
  );
}

export default Component;