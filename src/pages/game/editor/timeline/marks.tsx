import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { editor } from "../../../../store/editor";
import { marks } from "../../../../store/editorMarks";
import { Mark } from "./mark";

export const Marks = observer(() => {
  useEffect(() => {
    marks.setWidth(editor.width);
    marks.setScale(editor.scale);
    marks.setPosition(editor.position);

    marks.createMarks();
  }, [editor.width, editor.scale, editor.position]);

  return (
    <>
      {marks.marks.map((mark) => {
        return <Mark key={mark.value} mark={mark} />;
      })}
    </>
  );
});
