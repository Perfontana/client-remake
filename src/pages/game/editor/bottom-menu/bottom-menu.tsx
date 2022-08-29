import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { usePlayersReadynessToasts } from "./players-display/players-display";
import { SamplePicker } from "./sample-picker/sample-picker";

export const BottomMenu = observer(() => {
  usePlayersReadynessToasts();

  return (
    <HStack position={"fixed"} bottom={0}>
      <SamplePicker />
    </HStack>
  );
});
