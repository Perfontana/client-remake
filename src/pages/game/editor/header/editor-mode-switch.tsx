import { Button, HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { BsArrowsExpand, BsScissors } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiOutlineDrag } from "react-icons/ai";
import { editor, EditorMode } from "../../../../store/editor";
import { PropsWithChildren } from "react";

export const EditorModeSwitch = observer(() => {
  return (
    <HStack>
      <EditorModeButton label="Drag mode" mode={EditorMode.None}>
        <Icon as={AiOutlineDrag} />
      </EditorModeButton>

      <EditorModeButton label="Stretch mode" mode={EditorMode.Stretch}>
        <Icon as={BsArrowsExpand} transform="rotate(90deg)" />
      </EditorModeButton>

      <EditorModeButton label="Cut mode" mode={EditorMode.Cut}>
        <Icon as={BsScissors} />
      </EditorModeButton>

      <EditorModeButton label="Delete mode" mode={EditorMode.Delete}>
        <Icon as={MdDelete} />
      </EditorModeButton>
    </HStack>
  );
});

interface EditorModeButtonProps {
  label: string;
  mode: EditorMode;
}

const EditorModeButton = observer(
  ({ label, mode, children }: EditorModeButtonProps & PropsWithChildren) => {
    const onClick = () => {
      if (editor.mode === mode) editor.set({ mode: EditorMode.None });
      else editor.set({ mode });
    };

    return (
      <Tooltip label={label}>
        <Button
          colorScheme={editor.mode === mode ? "teal" : "gray"}
          onClick={onClick}
        >
          {children}
        </Button>
      </Tooltip>
    );
  }
);
