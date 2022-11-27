import React from "react";
import { useEditor } from "./useEditor";

export const Editor = () => {
  const editor = useEditor();

  return <div data-testid={"editor"} dangerouslySetInnerHTML={editor}></div>;
};
