import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { usePlayersReadynessToasts } from "./players-display/players-display";
import { SamplePicker } from "./sample-picker/sample-picker";
import { YoutubeLoader } from "./youtube-loader/youtube-loader";

export const BottomMenu = observer(() => {
  usePlayersReadynessToasts();

  return (
    <HStack position={"fixed"} bottom={0} right={0}>
      <YoutubeLoader />
      <SamplePicker />
    </HStack>
  );
});
