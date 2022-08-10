import { Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { language } from "../../../store/language";
import { operationsStack } from "../../../store/operationsStack";
import { Sample } from "../../../store/sample";
import tracks from "../../../store/tracks";
import { TRACK_HEIGHT } from "./track-samples/editor-work-area";

export const EditorDropArea = observer(() => {
  const addTrack = () => tracks.addTrack();

  const [, dropContainer] = useDrop(
    {
      accept: [NativeTypes.FILE],
      drop(item: any, monitor) {
        switch (monitor.getItemType()) {
          case NativeTypes.FILE: {
            const track = tracks.addTrack();
            Sample.loadFromFile(item.files[0] as File, track);

            operationsStack.push(() => tracks.removeTrack(track));

            break;
          }
        }
      },
    },
    []
  );

  return (
    <VStack
      ref={dropContainer}
      onClick={addTrack}
      minH={TRACK_HEIGHT}
      cursor={"pointer"}
      _hover={{
        opacity: 0.9,
      }}
      flex={1}
      opacity={0.5}
      transition="all 0.5s"
      w={"full"}
      h={"full"}
      bg="gray.200"
      color={"gray.700"}
      align={"center"}
      justify={"center"}
    >
      <Text>{language.ui.editor.dropArea.dropFile}</Text>
      <Text>{language.ui.editor.dropArea.click}</Text>
    </VStack>
  );
});
