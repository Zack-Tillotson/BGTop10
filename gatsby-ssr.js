const React = require('react')
const {RecoilRoot} = require('recoil')

exports.wrapPageElement = ({element, props}) => {
  return <RecoilRoot {...props}>{element}</RecoilRoot>
}