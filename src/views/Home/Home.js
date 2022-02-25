import * as React from "react"
import { Link } from 'gatsby'

import TitleRow from 'atoms/TitleRow'
import Button from 'atoms/Button'

import TagBrief from 'components/TagBrief'
import ListsBox from 'components/ListsBox'
import CreatorPills from 'components/CreatorPills'

import TagView from 'views/Tag'

import './home.scss'

const cn = 'home-view'

const Home = ({recentLists, allLists, tags, creators}) => {

  return (
    <div className={cn}>
      <section>
        <div className={`${cn}__promo-tag-list`}>
          {tags.filter(tag => tag.priority !== 1).sort((a, b) => b.priority - a.priority).map(tag => (
            <div key={tag.slug} className={`${cn}__tag`}>
              <TagView 
                tag={tag} 
                lists={allLists.filter(list => list.listTags.find(listTag => listTag.slug === tag.slug))}
                className="tag-view__promo" 
                TitleEle="h2"
                titleLink={true}
                showList={false}
                showCtaLinks={true}
                showDescriptionMobile={false}
                isTwoColumn={true}
                />
            </div>
          ))}
        </div>
        <div className={`${cn}__tag-list`}>
          <h2>More categories</h2>
          {tags.filter(tag => tag.priority == 1).map(tag => (
            <div key={tag.slug} className={`${cn}__tag`}>
              <TagBrief Element={Link} tag={tag} to={`/${tag.slug}/`} className="tag-view__title" />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>The latest game lists</h2>
        <ListsBox lists={recentLists} />
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
