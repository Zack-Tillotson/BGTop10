import * as React from "react"
import {Link} from 'gatsby'

import CreatorBrief from "components/CreatorBrief"

import './creator-pills.scss'

const baseCn = 'creator-pills'

const CreatorPills = ({creators}) => {

  return (
    <div className={`${baseCn}`}>
      <div className={`${baseCn}__pills`}>
        {creators.map(creator=> (
          <CreatorBrief
            key={creator.slug} 
            Element={Link}
            to={`/creator/${creator.slug}/`}
            creator={creator}
            className={`${baseCn}__creator`} />
        ))}
      </div>
    </div>
  )
}

export default CreatorPills
