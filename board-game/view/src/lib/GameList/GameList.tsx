import {ListSummary} from 'board-game-ui'

/* eslint-disable-next-line */
export interface GameListProps {}

export function GameList(props: GameListProps) {
  const listData = {
    title: 'Best board games of 2022',
    intro: 'From party games to RPG adventures to heavy euros, these are the best board games from 2022.',
    description: `
      It’s never been a better time to be a fan of board games with some of the best tabletop games ever made being available. Long gone are the days where you’d struggle to get anyone to pick up anything but Risk or Monopoly. With all the amazing board games out there it can be challenge to pick one, so let us help you pick from this list of the best board games.

      These lists include a wide variety of board games, both in terms of theme and gameplay. Whether you’re looking for the next co-op game to share with your friends, a new part game to play at the holidays, or a heavier strategic game to dig in to, you’ll be able to find an entry to fit your criteria. There are scary games, historical games, fantasy titles and even war-themed board games, meaning that whatever the weather you’ll have a fantastic tabletop title to pop onto the table.
    `,
    games: [{
      id: 1234,
      name: 'Endless Winter: Paleoamericans',
      year: 2022,
      imgSrc: 'https://cf.geekdo-images.com/TFX_awTwbJxoG74GtRHytw__original/img/plU9ZhUubz-1LHGfbsDstEOE9vg=/0x0/filters:format(jpeg)/pic5624523.jpg',
      imgAlt: 'Cavemen looking at the camera.',
      description: `
        Designed by Stan Kordonskiy (Dice Hospital, Rurik, Lock Up), developed by Jonny Pac (Coloma, Sierra West, Lions of Lydia), solo mode by Drake Villareal (Solani, Spook Manor), and illustrated by The Mico (Raiders of the North Sea, Paladins of the West Kingdom, Valeria), Endless Winter: Paleoamericans takes place in North America, around 10,000 BCE. Players guide the development of their tribes across several generations—from nomadic hunter-gatherers to prosperous tribal societies. Over the course of the game, tribes migrate and settle new lands, establish cultural traditions, hunt paleolithic megafauna, and build everlasting megalithic structures.

        Endless Winter is a euro-style game that combines worker placement and deck building in an innovative way. Each round, players send their tribe members to various action spaces, and pay for the actions by playing cards and spending resources. Tribe cards grant additional labor, while Culture cards provide a variety of unique effects. As an alternative, cards can be saved for an end-of-round Eclipse phase, where they are simultaneously revealed to determine the new player order, and trigger various bonus actions.

        The game features a novel blend of interwoven systems and mechanisms, such as multi-use cards, area influence, tile placement, and set collection. Plus, there are many viable paths to victory. After four brisk rounds, scores are tallied, and the tribe with the most points wins!

        —description from the publisher
      `,
      playerMin: 1,
      playerMax: 4,
      designer: 'Stan Kordonskiy',
      publisher: 'Fantasia Games',
    }, {
      id: 2345,
      name: 'Wonderland\'s War',
      year: 2022,
      imgSrc: 'https://cf.geekdo-images.com/bUbrvlY6Dw1cdb-sNrnkew__original/img/KcU-Srht_4xyLQ69ZjFcFKEOfMc=/0x0/filters:format(jpeg)/pic5188761.jpg',
      imgAlt: 'Zany cat smiling.',
      description: `
        The Looking Glass has shattered, madness is being drained from the inhabitants, and war has come to Wonderland. Alice, Mad Hatter, Red Queen, Jabberwock, and Cheshire Cat must gather all that they can while playing nice at the Hatter's Tea Party before going to battle!

        In Wonderland's War, 2-5 players take the role as a faction leader who has been invited to the Hatter's tea party. Drink tea and eat cake as you move around the table drafting cards to gather your forces, build your towers, upgrade your leader, and recruit Wonderlandians to your cause — but one must be careful as shards of the Looking Glass are spread throughout Wonderland. Once all the plates are empty, the Tea Party is over and war begins. Use the forces you gathered to battle your enemies in familiar locations, but make sure not to draw your Madness chips or your supporters will abandon your cause and you will be out of the fight. Can you muster enough strength to win the battle, or will you just try to complete Quests instead by meeting the right conditions such as gaining region bonuses and set collection throughout the game?
        
        After all the battles have been fought, a truce is called and everyone meets back at the tea party to plot their moves for the next fight. After three rounds, the faction with the most points will be crowned as the new leader of Wonderland!
      `,
      playerMin: 2,
      playerMax: 5,
      designer: 'Tim Eisner, Ben Eisner, Ian Moss',
      publisher: 'Druid City Games',
    }]
  }
  return (
    <ListSummary {...listData} /> 
  )
}

export default GameList;
