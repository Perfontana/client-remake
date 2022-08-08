import { Box, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { TIMELINE_HEIGHT } from "./editor-timeline";
import { TRACK_HEIGHT } from "./editor-work-area";

export const EditorTrackOptions = observer(() => {
  return (
    <VStack
      bg={"gray.600"}
      pt={`${TIMELINE_HEIGHT}px`}
      align="stretch"
      spacing={0}
    >
      <Box
        zIndex={1}
        h={TRACK_HEIGHT}
        position={"sticky"}
        left={0}
        bg={"pink.100"}
      >
        Track volume
      </Box>
    </VStack>
  );
});
