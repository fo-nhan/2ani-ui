import React, { useState, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $insertNodes,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
  UNDO_COMMAND,
  REDO_COMMAND,
  $createParagraphNode,
} from "lexical";
import styles from "./ToolbarPlugin.module.css";
import { FONT_SIZE_COMMAND, registerCommand } from "./commands";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import {
  $isParentElementRTL,
  $wrapNodes,
  $isAtNodeEnd,
} from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";

import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from "@lexical/code";

import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import Icon from "../../../Icon";
import Text from "../../Text";
import Popup from "../../Popup";
import Box from "../../Box";
import Modal from "../../Modal";
import { Button, Input, Line } from "../../..";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockType] = useState("left");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [openImage, setOpenImage] = React.useState(false);
  const [image, setImage] = React.useState("");

  useEffect(() => {
    registerCommand(editor);

    // Register a command to handle selection change
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));
          setIsStrikethrough(selection.hasFormat("strikethrough"));

          const anchorNode = selection.anchor.getNode();
          const element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : anchorNode.getTopLevelElementOrThrow();
          const elementKey: any = element.getKey();
          const elementDOM = editor.getElementByKey(elementKey);
          if (elementDOM !== null) {
            setSelectedElementKey(elementKey);
            if ($isListNode(element)) {
              const parentList = $getNearestNodeOfType(anchorNode, ListNode);
              const type = parentList ? parentList.getTag() : element.getTag();
              setBlockType(type);
            } else {
              const type = $isHeadingNode(element)
                ? element.getTag()
                : element.getType();
              setBlockType(type);
              if ($isCodeNode(element)) {
                setCodeLanguage(
                  element.getLanguage() || getDefaultCodeLanguage()
                );
              }
            }
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  const applyFormat = (command: any) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
  };

  const applyBlockFormat = (command: any) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, command);
  };

  const handleNextButtonClick = () => {
    (editor as any).dispatchCommand(REDO_COMMAND);
  };

  const handlePrevButtonClick = () => {
    (editor as any).dispatchCommand(UNDO_COMMAND);
  };

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"));
        }
      });
    }
  };

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      (editor as any).dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      (editor as any).dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      (editor as any).dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      (editor as any).dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
  };

  const onInsertImage = () => {
    if (image.trim().length) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        altText: "Editor Image",
        src: image,
      });
      setImage("");
      setOpenImage(false);
    }
  };

  const format = {
    paragraph: {
      icon: (
        <div style={{ width: "23px", height: "18px" }}>
          <Icon size={18} type="align-justify" />
        </div>
      ),
      text: "Bình thường",
      onClick: formatParagraph,
    },
    h1: {
      icon: (
        <div style={{ width: "23px" }}>
          <Text weight="600">H1</Text>
        </div>
      ),
      text: "Large Heading",
      onClick: formatLargeHeading,
    },
    h2: {
      icon: (
        <div style={{ width: "23px" }}>
          <Text weight="600">H2</Text>
        </div>
      ),
      text: "Small Heading",
      onClick: formatSmallHeading,
    },
    ul: {
      icon: (
        <div style={{ width: "23px", height: "18px" }}>
          <Icon size={18} type="list" />
        </div>
      ),
      text: "Bullet List",
      onClick: formatBulletList,
    },
    ol: {
      icon: (
        <div style={{ width: "23px", height: "18px" }}>
          <Icon size={18} type="list-number" />
        </div>
      ),
      text: "Numbered List",
      onClick: formatNumberedList,
    },
    quote: {
      icon: (
        <div style={{ width: "23px", height: "18px" }}>
          <Icon size={18} type="quote" />
        </div>
      ),
      text: "Quote",
      onClick: formatQuote,
    },
    code: {
      icon: (
        <div style={{ width: "23px" }}>
          <Icon size={18} type="code" />
        </div>
      ),
      text: "Code",
      onClick: formatCode,
    },
  };

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.layout}>
          <div
            className={`${styles.item}`}
            onClick={() => handlePrevButtonClick()}
          >
            <Icon type="undo" />
          </div>
          <div
            className={`${styles.item}`}
            onClick={() => handleNextButtonClick()}
          >
            <Icon type="redo" />
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.layout}>
          <Popup
            type="click"
            propsChildren={{
              width: 200,
            }}
            content={
              <Box flex="flexColumn" paddingX={5} paddingY={5} gap={5}>
                {Object.values(format).map((val, i) => (
                  <Box
                    onClick={val.onClick}
                    cursor="pointer"
                    hover
                    flex="flexStart"
                    align="center"
                    gap={5}
                    className={`${
                      blockType === Object.keys(format)[i] && styles.checked
                    }`}
                    height={35}
                    key={i}
                  >
                    {val.icon}
                    <Text weight="400">{val.text}</Text>
                  </Box>
                ))}
              </Box>
            }
          >
            <div className={`${styles.itemText}`}>
              {(format as any)[blockType] ? (
                <>
                  {(format as any)[blockType].icon}
                  {(format as any)[blockType].text}
                </>
              ) : (
                <>
                  <Icon size={18} type="edit-box" />
                  Định dạng
                </>
              )}
              <Icon size={18} type="arrow-down" />
            </div>
          </Popup>
        </div>
        <div className={styles.line}></div>
        <div className={styles.layout}>
          <Popup
            type="click"
            propsChildren={{ width: 200 }}
            content={
              <Box flex="flexColumn" paddingX={5} paddingY={5} gap={5}>
                <Box
                  cursor="pointer"
                  hover
                  flex="flexStart"
                  align="center"
                  gap={5}
                  className={`${blockType === "B" && styles.checked}`}
                  height={35}
                  onClick={() => setOpenImage(true)}
                >
                  <div style={{ width: "23px", height: "18px" }}>
                    <Icon size={18} type="image" />
                  </div>
                  <Text weight="400">Hình ảnh</Text>
                </Box>
                <Box
                  cursor="pointer"
                  hover
                  flex="flexStart"
                  align="center"
                  gap={5}
                  className={`${blockType === "B" && styles.checked}`}
                  height={35}
                >
                  <div style={{ width: "23px", height: "18px" }}>
                    <Icon size={18} type="link" />
                  </div>
                  <Text weight="400">Liên kết</Text>
                </Box>
                <Box
                  cursor="pointer"
                  hover
                  flex="flexStart"
                  align="center"
                  gap={5}
                  className={`${blockType === "B" && styles.checked}`}
                  height={35}
                >
                  <div style={{ width: "23px", height: "18px" }}>
                    <Icon size={18} type="table" />
                  </div>
                  <Text weight="400">Table</Text>
                </Box>
                <Box
                  cursor="pointer"
                  hover
                  flex="flexStart"
                  align="center"
                  gap={5}
                  className={`${blockType === "B" && styles.checked}`}
                  height={35}
                >
                  <div style={{ width: "23px", height: "18px" }}>
                    <Icon size={18} type="color" />
                  </div>
                  <Text weight="400">Màu chữ</Text>
                </Box>
                <Box
                  cursor="pointer"
                  hover
                  flex="flexStart"
                  align="center"
                  gap={5}
                  className={`${blockType === "B" && styles.checked}`}
                  height={35}
                >
                  <div style={{ width: "23px", height: "18px" }}>
                    <Icon size={18} type="video" />
                  </div>
                  <Text weight="400">Video</Text>
                </Box>
              </Box>
            }
          >
            <div className={`${styles.itemText}`}>
              <Icon size={18} type="edit-box" />
              Chèn
              <Icon size={18} type="arrow-down" />
            </div>
          </Popup>
        </div>
        <div className={styles.line}></div>
        <div className={styles.layout}>
          <div
            className={`${styles.item} ${isBold && styles.checked}`}
            onClick={() => applyFormat("bold")}
            style={{ fontSize: "24px", fontWeight: "bold" }}
          >
            B
          </div>
          <div
            className={`${styles.item} ${isItalic && styles.checked}`}
            onClick={() => applyFormat("italic")}
            style={{ paddingTop: 1 }}
          >
            <Icon type="italic" />
          </div>
          <div
            className={`${styles.item} ${isUnderline && styles.checked}`}
            onClick={() => applyFormat("underline")}
          >
            <Icon type="underline" />
          </div>
          <div
            className={`${styles.item} ${isStrikethrough && styles.checked}`}
            onClick={() => applyFormat("strikethrough")}
          >
            <Icon type="strikethrough" />
          </div>
        </div>

        <div className={styles.line}></div>

        <div className={styles.layout}>
          <div
            className={`${styles.item} ${
              blockType === "left" && styles.checked
            }`}
            onClick={() => applyBlockFormat("left")}
          >
            <Icon type="align-left" />
          </div>
          <div
            className={`${styles.item} ${
              blockType === "center" && styles.checked
            }`}
            onClick={() => applyBlockFormat("center")}
          >
            <Icon type="align-center" />
          </div>
          <div
            className={`${styles.item} ${
              blockType === "right" && styles.checked
            }`}
            onClick={() => applyBlockFormat("right")}
          >
            <Icon type="align-right" />
          </div>
          <div
            className={`${styles.item} ${
              blockType === "justify" && styles.checked
            }`}
            onClick={() => applyBlockFormat("justify")}
          >
            <Icon type="align-justify" />
          </div>
        </div>
      </div>
      <Line />
      <Modal
        isOpen={openImage}
        onClose={setOpenImage}
        children={
          <>
            <Input
              placeholder="Vui lòng nhập url"
              onChange={(e: any) => setImage(e.value)}
            />
            <br />
            <Box flex="flexEnd">
              <Button onClick={onInsertImage}>Xác nhận</Button>
            </Box>
          </>
        }
        title="Chèn hình ảnh"
      />
    </>
  );
}
