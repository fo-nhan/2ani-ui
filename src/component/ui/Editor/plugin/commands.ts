import {
  $getSelection,
  $isRangeSelection,
  createCommand,
  LexicalCommand,
  TextNode,
} from "lexical";

export const FONT_SIZE_COMMAND: LexicalCommand<string> = createCommand();

export function registerCommand(editor: any) {
  editor.registerCommand(
    FONT_SIZE_COMMAND,
    (size: any) => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const selectedNodes = selection.getNodes();
        const textNodes: TextNode[] = [];

        selectedNodes.forEach((node) => {
          if (node instanceof TextNode) {
            textNodes.push(node);
          }
        });

        textNodes.forEach((textNode: any) => {
          textNode.setStyle(`font-size: ${size}`);
        });
      }
      return true;
    },
    0
  );
}
