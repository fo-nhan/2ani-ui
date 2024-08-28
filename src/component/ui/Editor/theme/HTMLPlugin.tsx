import { useState, useEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getSelection, $insertNodes } from "lexical";

interface Props {
  initialHtml?: string;
  onHtmlChanged: (html: string) => void;
  clearState?: {
    state: any;
    setState: any;
  };
  addState?: {
    state: any;
    setState: any;
  };
  retrieve?: boolean;
}

const HtmlPlugin = ({
  initialHtml,
  onHtmlChanged,
  clearState = {
    state: false,
    setState: () => false,
  },
  addState = {
    state: "",
    setState: () => "",
  },
  retrieve = false,
}: Props) => {
  const [editor] = useLexicalComposerContext();

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!initialHtml || !isFirstRender) return;

    setIsFirstRender(false);

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHtml, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      $insertNodes(nodes);
    });
  }, []);

  useEffect(() => {
    if (clearState.state) {
      const initialEditorState = editor.parseEditorState(
        '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
      );
      editor.setEditorState(initialEditorState);
      clearState.setState(false);
      if (retrieve && initialHtml) {
        editor.update(() => {
          const parser = new DOMParser();
          const dom = parser.parseFromString(initialHtml, "text/html");
          const nodes = $generateNodesFromDOM(editor, dom);
          $insertNodes(nodes);
        });
      }
    }
  }, [clearState.state, retrieve]);

  useEffect(() => {
    if (addState.state) {
      editor.update(() => {
        const selection = $getSelection();
        if (selection) {
          selection.insertText(addState.state);
          addState.setState("");
        }
      });
    }
  }, [addState.state]);

  return (
    <OnChangePlugin
      onChange={(editorState: any) => {
        editorState.read(() => {
          onHtmlChanged($generateHtmlFromNodes(editor));
        });
      }}
    />
  );
};

export default HtmlPlugin;
