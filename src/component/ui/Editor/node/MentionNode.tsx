// import type { Spread } from "lexical";

// import {
//   DOMConversionMap,
//   DOMConversionOutput,
//   DOMExportOutput,
//   EditorConfig,
//   LexicalNode,
//   NodeKey,
//   SerializedTextNode,
//   TextNode,
// } from "lexical";

// export type SerializedMentionNode = Spread<
//   {
//     mentionName: string;
//     type: "mention";
//     token: string;
//     version: 1;
//   },
//   SerializedTextNode
// >;

// function convertMentionElement(
//   domNode: HTMLElement
// ): DOMConversionOutput | null {
//   const textContent = domNode.textContent;
//   const tokenContent = domNode.getAttribute("data-mention-token");

//   if (textContent !== null) {
//     const node = $createMentionNode(textContent, tokenContent || undefined);
//     return {
//       node,
//     };
//   }

//   return null;
// }

// const mentionStyle = "background-color: rgba(24, 119, 232, 0.2)";
// export class MentionNode extends TextNode {
//   __mention: string;

//   static getType(): string {
//     return "mention";
//   }

//   static clone(node: MentionNode): MentionNode {
//     return new MentionNode(
//       node.__mention,
//       node.__token,
//       node.__text,
//       node.__key
//     );
//   }
//   static importJSON(serializedNode: SerializedMentionNode): MentionNode {
//     const node = $createMentionNode(
//       serializedNode.mentionName,
//       serializedNode.token
//     );
//     node.setTextContent(serializedNode.text);
//     node.setFormat(serializedNode.format);
//     node.setDetail(serializedNode.detail);
//     node.setMode(serializedNode.mode);
//     node.setStyle(serializedNode.style);
//     return node;
//   }

//   constructor(
//     mentionName: string,
//     token?: string,
//     text?: string,
//     key?: NodeKey
//   ) {
//     super(text ?? mentionName, key);
//     this.__mention = mentionName;
//     this.__token = token;
//   }

//   exportJSON(): SerializedMentionNode {
//     return {
//       ...super.exportJSON(),
//       mentionName: this.__mention,
//       token: this.__token,
//       type: "mention",
//       version: 1,
//     };
//   }

//   createDOM(config: EditorConfig): HTMLElement {
//     const dom = super.createDOM(config);
//     dom.style.cssText = mentionStyle;
//     dom.className = "mention";
//     return dom;
//   }

//   exportDOM(): DOMExportOutput {
//     const element = document.createElement("span");
//     element.setAttribute("data-lexical-mention", "true");
//     element.setAttribute("data-mention-token", this.__token);
//     element.textContent = this.__text;
//     return { element };
//   }

//   isSegmented(): false {
//     return false;
//   }

//   static importDOM(): DOMConversionMap | null {
//     return {
//       span: (domNode: HTMLElement) => {
//         if (
//           !domNode.hasAttribute("data-lexical-mention") ||
//           !domNode.hasAttribute("data-mention-token")
//         ) {
//           return null;
//         }
//         return {
//           conversion: convertMentionElement,
//           priority: 1,
//         };
//       },
//     };
//   }

//   isTextEntity(): true {
//     return true;
//   }

//   isToken(): true {
//     return true;
//   }
// }

// export function $createMentionNode(
//   mentionName: string,
//   token?: string
// ): MentionNode {
//   const mentionNode = new MentionNode(mentionName, token);
//   mentionNode.setMode("segmented").toggleDirectionless();
//   return mentionNode;
// }

// export function $isMentionNode(
//   node: LexicalNode | null | undefined
// ): node is MentionNode {
//   return node instanceof MentionNode;
// }
