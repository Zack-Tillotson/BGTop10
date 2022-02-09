import * as React from "react"
import { Link } from 'gatsby'

import TitleRow from 'atoms/TitleRow'
import Button from 'atoms/Button'

import TagBrief from 'components/TagBrief'
import ListsBox from 'components/ListsBox'
import CreatorPills from 'components/CreatorPills'

import './home.scss'

const cn = 'home-view'

const Home = ({lists, tags, creators}) => {

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
      <section>
        <TitleRow Element="h2" title="Channels">
          <Button type="link" to="/creator/" minimal>View all</Button>
        </TitleRow>
        <CreatorPills creators={creators} />
      </section>
    </div>
  )
}

export default Home
