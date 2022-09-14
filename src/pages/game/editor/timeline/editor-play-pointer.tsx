import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { CSSProperties } from "react";
import { editor } from "../../../../store/editor";
import { POSITION_REFRESH_RATE } from "../editor";

const pointerStyle: CSSProperties = {
  width: "0",
  height: "0",
  borderStyle: "solid",
  borderWidth: "6px 6px 0 6px",
  transform: "translate(-50%, 0)",
  borderColor: "#ffffff transparent transparent transparent",
};

export const EditorPlayPointer = observer(() => {
  const style: CSSProperties = {
    width: "1px",
    background: "white",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    transition: `left ${1 / POSITION_REFRESH_RATE}s linear`,
  };
  style.left = `${editor.playPositionPixels}px`;

  return (
    <div style={style}>
      <div style={pointerStyle}></div>
    </div>
  );
});
