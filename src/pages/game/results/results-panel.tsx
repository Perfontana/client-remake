import { observer } from "mobx-react-lite";
import game from "../../../store/game";
import { RoundPlayerResult } from "../../../types/Room";
import { ResultsAudio } from "./results-audio";
import { ResultsMissing } from "./results-missing";

export interface ResultsPanelProps {
  songAuthor: string;
}

export const ResultsPanel = observer(({ songAuthor }: ResultsPanelProps) => {
  return (
    <>
      {game.rounds.map((round, index) => {
        let roundResult: RoundPlayerResult | undefined;
        if (index === 0) {
          roundResult = round.find(
            (roundResult) => roundResult.player === songAuthor
          );
        } else {
          roundResult = round.find(
            (roundResult) => roundResult.song === songAuthor
          );
        }

        if (!roundResult || !roundResult.sent)
          return (
            <ResultsMissing
              key={roundResult?.player + "missing"}
              player={game.players.find(
                (player) => player.name === roundResult?.player
              )}
            />
          );

        const song = game.songs[songAuthor].find(
          (song) => song.player === roundResult!.player
        );

        return (
          <ResultsAudio key={song!._id} src={song!.url} player={song!.player} />
        );
      })}
    </>
  );
});
