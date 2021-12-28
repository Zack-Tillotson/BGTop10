import React, { useEffect } from 'react'
import cn from 'classnames'

import PageHead from '../PageHead'

import './component.scss'

function Component({ 
  isHeadShown = true, 
  className, 
  children,
  location,
  Ele = 'main',
}) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Ele className="page">
      {isHeadShown && (
        <PageHead className="page__head" />
      )}
      <div className={cn('page__content', 'page__container', className)}>
        {children}
      </div>
      <div className="page__foot">
        <div className="page__container">
          <a href="https://zacherytillotson-com.web.app">© Zack Tillotson</a>
        </div>
      </div>
    </Ele>
  );
}

export default Component;