import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useEditor } from "./useEditor";

export const Editor = () => {
  const editorConfig = useEditor();

  if (!editorConfig.ready) {
    return <div>Loading...</div>;
  }

  return (
    <CodeMirror
      value={editorConfig.defaultValue}
      height="200px"
      extensions={[...editorConfig.languages]}
    />
  );
};
