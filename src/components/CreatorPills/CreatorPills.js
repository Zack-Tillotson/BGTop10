import * as React from "react"
import {Link} from 'gatsby'

import Pill from 'atoms/Pill'

import './creator-pills.scss'

const baseCn = 'creator-pills'

const CreatorPills = ({creators}) => {

  return (
    <div className={`${baseCn}`}>
      <div className={`${baseCn}__pills`}>
        {creators.map(creator=> (
          <Pill 
            key={creator.slug} 
            Element={Link} 
            to={`/creator/${creator.slug}/`}
            className={`${baseCn}__creator`}>
              {creator.name}
          </Pill>
        ))}
      </div>
    </div>
  )
}

export default CreatorPills
