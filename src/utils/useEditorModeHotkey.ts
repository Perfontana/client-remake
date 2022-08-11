import { useHotkeys } from "react-hotkeys-hook";
import { editor, EditorMode } from "../store/editor";

export const useEditorModeHotkey = (key: string, mode: EditorMode) =>
  useHotkeys(
    key,
    (event) => {
      if (event.type === "keydown") editor.set({ mode });
      else editor.set({ mode: EditorMode.None });
    },
    { keydown: true, keyup: true },
    []
  );
