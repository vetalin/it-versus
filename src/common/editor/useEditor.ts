import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import { LanguageSupport } from "@codemirror/language";

interface EditorConfig {
  ready: boolean;
  languages: LanguageSupport[];
  defaultValue: string;
}

export const useEditor = () => {
  const [editor, setEditor] = useState<EditorConfig>({
    ready: false,
    languages: [],
    defaultValue: `// This is a test`,
  });

  useEffect(() => {
    const languages = [javascript()];

    setEditor({ ...editor, ready: true, languages });
  }, []);

  return editor;
};
