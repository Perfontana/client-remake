import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Spinner,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useBoolean,
  useMultiStyleConfig,
  useTab,
  VStack,
} from "@chakra-ui/react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import {
  forwardRef,
  MouseEvent,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { BsDownload, BsPause, BsPlay } from "react-icons/bs";
import Knob from "../../../components/knob";
import game from "../../../store/game";
import { Sample } from "../../../store/sample";
import tracks from "../../../store/tracks";
import Player from "../../../types/Player";
import { RoundPlayerResult } from "../../../types/Room";
import { pointFromPixelsToSeconds } from "../../../utils/transformCoordinates";
import { SampleWaveform } from "../editor/track-samples/sample/sample-waveform";
import { PlayerAvatar } from "../lobby/player-avatar";
import { ResultsPanel } from "./results-panel";
import { ResultsTab } from "./results-tab";

export const Results = observer(() => {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    game.loadRoom();
  }, []);

  const songs = game.players.map((player) => ({
    name: player.name,
    songs: game.songs[player.name],
  }));

  return (
    <>
      {songs?.length ? (
        <Tabs index={tabIndex} onChange={setTabIndex}>
          <TabList overflowX={"scroll"} overflowY="hidden" position="relative">
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
          </TabList>

          <TabPanels>
            {songs.map(({ name }, index) => (
              <TabPanel p={0} key={name} tabIndex={index}>
                <ResultsPanel songAuthor={name} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      ) : (
        <Spinner />
      )}
    </>
  );
});
