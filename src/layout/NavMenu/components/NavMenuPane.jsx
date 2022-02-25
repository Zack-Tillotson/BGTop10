import React from 'react';
import cn from 'classnames'
import { useStaticQuery, graphql, Link } from "gatsby"

import Button from 'atoms/Button'
import TagBrief from 'components/TagBrief'
import './nav-menu-pane.scss'

const baseCn = 'nav-menu-pane'

function NavMenuPane({onClose}) {

  const data = useStaticQuery(graphql`
    query NavMenuPaneQuery {
      allContentfulTag(filter: {priority: {gt: 1}}, sort: {fields: priority, order: DESC}) {
        tags: nodes {
          slug
          display
          pageSubtitle {
            pageSubtitle
          }
          icon
        }
      }
    }
  `)

  const {tags} = data.allContentfulTag

  return (
    <div className={cn(baseCn)} role="document" tabIndex="0">
      <section className={`${baseCn}__section`}>
        <h3 className={`${baseCn}__section-header`}>Find a game</h3>
        <div className={`${baseCn}__section-content`}>
          <Button type="link" to="/search/" className="page-head-menu__item" primary wide onClick={onClose}>
            Search games
          </Button>
        </div>
      </section>
      <section className={`${baseCn}__section`}>
        <h3 className={`${baseCn}__section-header`}>Popular Categories</h3>
        <div className={`${baseCn}__section-content`}>
          {tags.map((tag, index, ary) => (
            <TagBrief key={tag.slug} tag={tag} Element={Link} to={`/${tag.slug}/`} isLast={index === ary.length - 1} className={`${baseCn}__item`} />
          ))}
        </div>
      </section>
      <section className={`${baseCn}__section`}>
        <h3 className={`${baseCn}__section-header`}>More links</h3>
        <div className={`${baseCn}__section-content`}>
          <Link to="/about/" className="page-head-menu__item">About</Link>
        </div>
      </section>
    </div>
  )

}

export default NavMenuPane