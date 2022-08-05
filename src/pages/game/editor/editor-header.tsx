import { Button, HStack, Icon, IconButton } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { BsPlay, BsPause, BsStop, BsMic, BsArrowRight } from "react-icons/bs";

export const EditorHeader = observer(() => {
  return (
    <HStack p={6} justify="space-between">
      <HStack>
        <IconButton aria-label="Play" icon={<BsPlay />} />
        <IconButton aria-label="Pause" icon={<BsPause />} />
        <IconButton aria-label="Stop" icon={<BsStop />} />
        <IconButton aria-label="Start recording" icon={<BsMic />} />
      </HStack>
      <Button>
        Send song <Icon ml={2} as={BsArrowRight} />
      </Button>
    </HStack>
  );
});
