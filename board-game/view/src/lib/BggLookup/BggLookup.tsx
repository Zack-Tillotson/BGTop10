import { Input, Modal, ModalClose, Sheet, Typography } from "@mui/joy";

interface BggLookupClientProps {
  query: string,
  games: {name: string, yearPublished: string, bggId: number}[],
  onSelect: (bggId: number) => void,
  onClose: () => void,
}

export function BggLookup({query, games, onSelect, onClose}: BggLookupClientProps) {
  return (
    <Modal
      aria-labelledby="bgg-lookup-title"
      onClose={onClose}
      open={true}>
      <Sheet variant="outlined">
        <ModalClose>Close</ModalClose>
        <Typography level="h1" id="bgg-lookup-title">BGG Lookup</Typography>
        <Input type="text" value={query} placeholder="Game name" />
        <Typography level="h2">Games</Typography>
        <ul>
          {games.map(game => (
            <li key={game.bggId} onClick={() => onSelect(game.bggId)}>
              {game.name} ({game.yearPublished})
            </li>
          ))}
        </ul>
      </Sheet>
    </Modal>
  );
}
