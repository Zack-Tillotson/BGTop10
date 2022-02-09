import * as React from "react"
import { Link } from 'gatsby'

import TagBrief from 'components/TagBrief'
import ListsBox from 'components/ListsBox'

import './home.scss'

const cn = 'home-view'

const Home = ({lists, tags}) => {

  return (
    <div className={cn}>
      <section>
        <h2>The best board games by category</h2>
        <div className={`${cn}__tag-list`}>
          {tags.map(tag => (
            <div key={tag.slug} className={`${cn}__tag`}>
              <TagBrief Element={Link} tag={tag} to={`/${tag.slug}/`} className="tag-view__title" />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>The latest game lists</h2>
        <ListsBox lists={lists} />
      </section>
    </div>
  )
}

export default Home
