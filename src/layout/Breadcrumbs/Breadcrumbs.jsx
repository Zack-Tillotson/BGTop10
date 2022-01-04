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
      <Font level="charlie">
        {locations.map((location, index) => (
          <Link to={location.url} key={location.url} className={`${baseCn}__link`}>
            <span className={`${baseCn}__link ${index === 0 ? `${baseCn}__link--highlight` : ``}`}>
              {location.display}
            </span>
          </Link>
        ))
        .map((link, index) => [link, (<span key={'span'+index} className="breadcrumbs__spacer"> › </span>)])
        .reduce((soFar, pair) => [...soFar, ...pair], [])
        .slice(0, -1)}
      </Font>
    </div>
  );
}

export default Breadcrumbs;