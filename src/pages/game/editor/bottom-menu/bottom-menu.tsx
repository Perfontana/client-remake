import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { PlayersDisplay } from "./players-display/players-display";

export const BottomMenu = observer(() => {
  return (
    <HStack position={"fixed"} bottom={0}>
      <PlayersDisplay />
    </HStack>
  );
});
