import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { GoogleTTS } from "./google-tts/google-tts";
import { usePlayersReadynessToasts } from "./players-display/players-display";
import { SamplePicker } from "./sample-picker/sample-picker";
import { YoutubeLoader } from "./youtube-loader/youtube-loader";

export const BottomMenu = observer(() => {
  usePlayersReadynessToasts();

  return (
    <HStack padding={2} position={"fixed"} bottom={0} right={0}>
      <GoogleTTS />
      <YoutubeLoader />
      <SamplePicker />
    </HStack>
  );
});
