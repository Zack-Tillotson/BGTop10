import * as React from 'react'
import { RecoilRoot } from 'recoil'

import './src/globalStyles/0-reset.scss'
import './src/globalStyles/1-variables.scss'
import './src/globalStyles/2-design.scss'

export const wrapPageElement = ({element, props}) => {
  return <RecoilRoot {...props}>{element}</RecoilRoot>
}

window.addEventListener('error', event => {
  if(event.target && event.target.nodeName === 'IMG') {
    event.target.classList.add('error-hidden')
  }
})
