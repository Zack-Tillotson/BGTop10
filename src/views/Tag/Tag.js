import * as React from "react"
import {Link} from 'gatsby'
import cn from 'classnames'
import ReactMarkdown from 'react-markdown'

import Button from 'atoms/Button'
import TitleRow from 'atoms/TitleRow'

import GameMini from 'components/GameMini'
import ListsBox from 'components/ListsBox'
import CreatorPills from 'components/CreatorPills'

import useTagData from 'useTagData'

import './component.scss'

const baseCn = 'tag-view'

const TagView = ({
  tag, 
  lists, 
  TitleEle = 'h1',
  titleLink = false,
  showDescription = true,
  showDescriptionMobile = true,
  showList = true,
  showCtaLinks = false,
  isTwoColumn = false,
  isRightImages = false,
}) => {

  const {games, creators} = useTagData(tag, lists)

  const TitleWrapper = titleLink ? Link : 'span'
  const titleProps = titleLink ? {to: `/${tag.slug}/`} : {}

  return (
    <div className={cn(baseCn, {[`${baseCn}--two-column`]: isTwoColumn, [`${baseCn}--right-imgs`]: isRightImages})}>
      <div className={`${baseCn}__title-section`}>
        <TitleWrapper {...titleProps}>
          <TitleEle>{tag.pageTitle}</TitleEle>
        </TitleWrapper>
        {tag.pageSubtitle && (
          <p>{tag.pageSubtitle.pageSubtitle}</p>
        )}
      </div>
      <div className={`${baseCn}__header-images`}>
        {games.slice(0, 3).map(game => {
          const Wrapper = showCtaLinks ? Link : 'div'
          const wrapperProps = showCtaLinks ? {to: `/${tag.slug}/#game-${game.bggId}`} : {}
          return (
            <Wrapper {...wrapperProps} key={game.bggId} role="presentation" className={`${baseCn}__header-image-wrapper`}>
              <div key={game.bggId} role="presentation" className={`${baseCn}__header-image`} style={{backgroundImage: `url("${game.image}")`}} alt={game.title} />
            </Wrapper>
          )
        })}
      </div>
      {tag.introduction && showDescription && (
        <section className={cn(`${baseCn}__description`, {[`${baseCn}__description--mobile-hidden`]: !showDescriptionMobile})}>
          <ReactMarkdown>
            {tag.introduction.introduction}
          </ReactMarkdown>
        </section>
      )}
      {showCtaLinks && (
        <section className={`${baseCn}__cta-section`}>
          <Button type="link" hollow to={`/${tag.slug}/`} className={`${baseCn}__cta`}>See the games</Button>
        </section>
      )}
      {showList && (
        <>
          <section>
            <TitleRow title={`Top 10 ${tag.display}`} className={`${baseCn}__title-row`} />
            <ol reversed className={`${baseCn}__ordered-list`}>
              {games.slice(0, 10).reverse().map((game, index, {length: arraySize}) => (
                <li key={game.bggId} className={`${baseCn}__ordered-list-line`} data-count={game.count} id={`game-${game.bggId}`}>
                  <div className={`${baseCn}__ordered-list-number-wrapper`}>
                    <div className={`${baseCn}__ordered-list-number`}>
                      {arraySize - index}.
                    </div>
                  </div>
                  <GameMini game={game} className={`${baseCn}__ordered-list-mini`} />
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h4>Popular creators</h4>
            <CreatorPills creators={creators} />
          </section>
          <section>
            <h2>See why these games make the best {tag.display}</h2>
            <ListsBox lists={lists} />
          </section>
        </>
      )}
    </div>
  )
}

export default TagView
