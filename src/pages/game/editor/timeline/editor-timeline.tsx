import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Marks } from "./marks";

export const TIMELINE_HEIGHT = 25;

export const Timeline = observer(() => {
  return (
    <HStack
      spacing={0}
      bg={"gray.600"}
      position={"relative"}
      w={"full"}
      h={`${TIMELINE_HEIGHT}px`}
      color={"white"}
    >
      <Marks />
    </HStack>
  );
});
