import { observer } from "mobx-react-lite";
import game from "../../../store/game";
import { PlayerCard } from "./player-card";

export const PlayerCardList = observer(() => (
  <>
    {game.players.map((player) => (
      <PlayerCard player={player} key={player.name} />
    ))}
  </>
));
