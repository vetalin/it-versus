import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";

export const useEditor = () => {
  let startState = EditorState.create({
    doc: `function() {
      console.log("Hello World");
    }`,
    extensions: [
      EditorState.tabSize.of(16),
      basicSetup,
      keymap.of(defaultKeymap),
      javascript(),
    ],
  });

  let view = new EditorView({
    state: startState,
    parent: document.body,
  });

  const editorHtml = {
    __html: view.dom.innerHTML,
  };

  return editorHtml;
};
