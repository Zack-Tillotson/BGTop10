import * as React from 'react'
import { RecoilRoot } from 'recoil'

import './src/globalStyles/0-reset.scss'
import './src/globalStyles/1-variables.scss'
import './src/globalStyles/2-design.scss'

export const wrapPageElement = ({element, props}) => {
  return <RecoilRoot {...props}>{element}</RecoilRoot>
}