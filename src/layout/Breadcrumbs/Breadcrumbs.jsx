import React from 'react'
import {Link} from 'gatsby'

import Font from 'atoms/Font'

import './component.scss'

const baseCn = 'breadcrumbs'

function Breadcrumbs({ 
  locations
}) {

  return (
    <div className={baseCn}>
      <Font level="delta">
        {locations.map(location => (
          <Link to={location.url} key={location.url} className={`${baseCn}__link`}>
            {location.display}
          </Link>
        ))
        .map(link => [link, ' | '])
        .reduce((soFar, pair) => [...soFar, ...pair], [])
        .slice(0, -1)}
      </Font>
    </div>
  );
}

export default Breadcrumbs;