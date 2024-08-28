import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";

import { HashtagNode } from "@lexical/hashtag";

import styles from "./Editor.module.css";
import { baseTheme } from "./theme/BaseTheme";
import onHandleChange from "./onChange";
import HtmlPlugin from "./theme/HTMLPlugin";
// import { MentionNode } from "./node/MentionNode";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode } from "@lexical/link";

// import MentionsPlugin from "./plugin/MentionsPlugin";
import { ToolbarPlugin } from "./plugin/ToolbarPlugin";
import { ImageNode } from "./node/ImageNode";
import ImagesPlugin from "./plugin/ImagePlugin";
import React from "react";
import Popup from "../Popup";
import Text from "../Text";
import { returnStyle } from "../../utils/style";
import Box from "../Box";
import { formatNumber } from "../../utils/fs";

export type EditorTypeProps = {
  placeholder?: string;
  onChange?: (data?: {
    text: string;
    html: any;
    textLength: number;
    textFullLength: number;
    mentions: string[];
    links: string[];
  }) => void;
  editFunction?: (callback: Function) => void;
  defaultValue?: string;
  hashTags?: boolean;
  clearState?: {
    state: any;
    setState: any;
  };
  addState?: {
    state: any;
    setState: any;
  };
  retrieve?: boolean;
  autoFocus?: boolean;
  showToolbar?: boolean;
  showCharCount?: boolean;
  minHeight?: number | string;
};

export default function Editor({
  placeholder,
  onChange = () => {},
  defaultValue = "",
  clearState = {
    state: false,
    setState: () => false,
  },
  addState = {
    state: "",
    setState: () => "",
  },
  retrieve = false,
  hashTags = false,
  autoFocus = false,
  showToolbar = false,
  showCharCount = false,
  minHeight = 40,
}: EditorTypeProps) {
  const [charCount, setCharCount] = React.useState({
    char: 0,
    charNo: 0,
    charLt: 0,
  });
  const editorConfig: any = {
    theme: baseTheme,
    onError(error: any) {
      throw error;
    },
    nodes: [
      HashtagNode,
      // MentionNode,
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      ...(showToolbar ? [ImageNode] : []),
    ],
  };

  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        {showToolbar ? <ToolbarPlugin /> : ""}
        <div className={returnStyle(["container"], styles)}>
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  style={{ minHeight: minHeight }}
                  className={returnStyle(["editor"], styles)}
                />
              }
              placeholder={<Placeholder text={placeholder} />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HtmlPlugin
              onHtmlChanged={(html) => {
                const result: any = onHandleChange(html, onChange);

                setCharCount({
                  char:
                    result?.text?.trim() && result?.text?.trim()?.length > 0
                      ? result?.text?.trim()?.split(" ").length || 0
                      : 0,
                  charNo: result?.text?.trim()?.replaceAll(" ", "").length || 0,
                  charLt: result?.text?.trim()?.length || 0,
                });
              }}
              initialHtml={defaultValue}
              clearState={clearState}
              retrieve={retrieve}
              addState={addState}
            />
            <HistoryPlugin />
            {autoFocus && <AutoFocusPlugin />}
            {hashTags && <HashtagPlugin />}
            {/* {mention && <MentionsPlugin />} */}
            {showToolbar && <ImagesPlugin />}
          </div>
          {showCharCount && (
            <Popup
              content={
                <Box flex="flexColumn">
                  <div>
                    <Text weight="500" size="h2">
                      {formatNumber(charCount.char)} từ
                    </Text>
                  </div>
                  <div>
                    <Text weight="500" size="h2">
                      {formatNumber(charCount.charLt)} ký tự
                    </Text>
                  </div>
                  <div>
                    <Text weight="500" size="h2">
                      {formatNumber(charCount.charNo)} ký tự không khoảng trống
                    </Text>
                  </div>
                </Box>
              }
            >
              <div className={styles.charCount}>
                <Text size="h2">{formatNumber(charCount.char)} từ</Text>
              </div>
            </Popup>
          )}
        </div>
      </LexicalComposer>
    </>
  );
}

function Placeholder({ text = "" }) {
  return (
    <div className={returnStyle(["editor-placeholder"], styles)}>{text}</div>
  );
}
