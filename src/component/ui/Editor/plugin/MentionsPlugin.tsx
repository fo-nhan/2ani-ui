// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import {
//   LexicalTypeaheadMenuPlugin,
//   QueryMatch,
//   TypeaheadOption,
//   useBasicTypeaheadTriggerMatch,
// } from "@lexical/react/LexicalTypeaheadMenuPlugin";
// import { TextNode } from "lexical";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import * as React from "react";
// import * as ReactDOM from "react-dom";

// import { $createMentionNode } from "../node/MentionNode";
// import { Avatar, Popup, Skeleton, View } from "@core/framework-ui";
// import styles from "./MentionsPlugin.module.scss";
// import { SizeOfElement } from "@core/utils";
// import { reState } from "@state";
// import { MentionType } from "@state/use/mentions";

// const PUNCTUATION =
//   "\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;";
// const NAME = "\\b[A-Z][^\\s" + PUNCTUATION + "]";

// const DocumentMentionsRegex = {
//   NAME,
//   PUNCTUATION,
// };

// const CapitalizedNameMentionsRegex = new RegExp(
//   "(^|[^#])((?:" + DocumentMentionsRegex.NAME + "{" + 1 + ",})$)"
// );

// const PUNC = DocumentMentionsRegex.PUNCTUATION;

// const TRIGGERS = ["@"].join("");

// // Chars we expect to see in a mention (non-space, non-punctuation).
// const VALID_CHARS = "[^" + TRIGGERS + PUNC + "\\s]";

// // Non-standard series of chars. Each series must be preceded and followed by
// // a valid char.
// const VALID_JOINS =
//   "(?:" +
//   "\\.[ |$]|" + // E.g. "r. " in "Mr. Smith"
//   " |" + // E.g. " " in "Josh Duck"
//   "[" +
//   PUNC +
//   "]|" + // E.g. "-' in "Salier-Hellendag"
//   ")";

// const LENGTH_LIMIT = 75;

// const AtSignMentionsRegex = new RegExp(
//   "(^|\\s|\\()(" +
//     "[" +
//     TRIGGERS +
//     "]" +
//     "((?:" +
//     VALID_CHARS +
//     VALID_JOINS +
//     "){0," +
//     LENGTH_LIMIT +
//     "})" +
//     ")$"
// );

// // 50 is the longest alias length limit.
// const ALIAS_LENGTH_LIMIT = 50;

// // Regex used to match alias.
// const AtSignMentionsRegexAliasRegex = new RegExp(
//   "(^|\\s|\\()(" +
//     "[" +
//     TRIGGERS +
//     "]" +
//     "((?:" +
//     VALID_CHARS +
//     "){0," +
//     ALIAS_LENGTH_LIMIT +
//     "})" +
//     ")$"
// );

// // At most, 5 suggestions are shown in the popup.
// const SUGGESTION_LIST_LENGTH_LIMIT = 999;

// const mentionsCache = new Map();

// function useMentionLookupService(mentionString: string | null) {
//   const [results, setResults] = useState<Array<MentionType>>([]);

//   const { mentions, setKearchMention } = React.useContext(reState);

//   useEffect(() => {
//     const cachedResults = mentionsCache.get(mentionString);

//     if (cachedResults === null) {
//       return;
//     } else if (cachedResults !== undefined) {
//       setResults(cachedResults);
//       return;
//     }

//     setKearchMention(mentionString || "");
//   }, [mentionString]);

//   useEffect(() => {
//     const cachedResults = mentionsCache.get(mentionString);

//     if (cachedResults === null) {
//       return;
//     } else if (cachedResults !== undefined) {
//       setResults(cachedResults);
//       return;
//     }

//     mentionsCache.set(mentionString, null);
//     mentionsCache.set(mentionString, mentions);
//     setResults(mentions || []);
//   }, [mentions]);

//   return results;
// }

// function checkForCapitalizedNameMentions(
//   text: string,
//   minMatchLength: number
// ): QueryMatch | null {
//   const match = CapitalizedNameMentionsRegex.exec(text);
//   if (match !== null) {
//     // The strategy ignores leading whitespace but we need to know it's
//     // length to add it to the leadOffset
//     const maybeLeadingWhitespace = match[1];

//     const matchingString = match[2];
//     if (matchingString != null && matchingString.length >= minMatchLength) {
//       return {
//         leadOffset: match.index + maybeLeadingWhitespace.length,
//         matchingString,
//         replaceableString: matchingString,
//       };
//     }
//   }
//   return null;
// }

// function checkForAtSignMentions(
//   text: string,
//   minMatchLength: number
// ): QueryMatch | null {
//   let match = AtSignMentionsRegex.exec(text);

//   if (match === null) {
//     match = AtSignMentionsRegexAliasRegex.exec(text);
//   }
//   if (match !== null) {
//     // The strategy ignores leading whitespace but we need to know it's
//     // length to add it to the leadOffset
//     const maybeLeadingWhitespace = match[1];

//     const matchingString = match[3];
//     if (matchingString.length >= minMatchLength) {
//       return {
//         leadOffset: match.index + maybeLeadingWhitespace.length,
//         matchingString,
//         replaceableString: match[2],
//       };
//     }
//   }
//   return null;
// }

// function getPossibleQueryMatch(text: string): QueryMatch | null {
//   const match = checkForAtSignMentions(text, 0);
//   return match === null ? checkForCapitalizedNameMentions(text, 3) : match;
// }

// class MentionTypeaheadOption extends TypeaheadOption {
//   name: string;
//   subText: string;
//   avatar: string;
//   token: string;
//   picture: JSX.Element;

//   constructor(
//     name: string,
//     avatar: string,
//     subText: string,
//     token: string,
//     picture: JSX.Element
//   ) {
//     super(name);
//     this.name = name;
//     this.avatar = avatar;
//     this.subText = subText;
//     this.token = token;
//     this.picture = picture;
//   }
// }

// function MentionsTypeaheadMenuItem({
//   index,
//   isSelected,
//   onClick,
//   onMouseEnter,
//   option,
// }: {
//   index: number;
//   isSelected: boolean;
//   onClick: () => void;
//   onMouseEnter: () => void;
//   option: MentionTypeaheadOption;
// }) {
//   let className = "item";
//   if (isSelected) {
//     className += " selected";
//   }
//   return (
//     <div onClick={onClick} className={styles.item}>
//       {option.avatar && <Avatar src={option.avatar} size="medium" />}
//       <li
//         key={option.key}
//         tabIndex={-1}
//         className={className}
//         ref={option.setRefElement}
//         role="option"
//         aria-selected={isSelected}
//         id={"typeahead-item-" + index}
//         onMouseEnter={onMouseEnter}
//       >
//         {option.picture}
//         <div className={styles.content}>
//           <span className={styles.name}>{option.name}</span>
//           {option.subText && (
//             <span className={styles.subText}>{option.subText}</span>
//           )}
//         </div>
//       </li>
//     </div>
//   );
// }

// export default function MentionsPlugin(): JSX.Element | null {
//   const [editor] = useLexicalComposerContext();

//   const [queryString, setQueryString] = useState<string | null>(null);

//   const results = useMentionLookupService(queryString);

//   const checkForSlashTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
//     minLength: 0,
//   });

//   const options = useMemo(
//     () =>
//       results
//         .map(
//           (result) =>
//             new MentionTypeaheadOption(
//               result.name,
//               result.avatar,
//               result.subText,
//               result.token,
//               <i />
//             )
//         )
//         .slice(0, SUGGESTION_LIST_LENGTH_LIMIT),
//     [results]
//   );

//   const onSelectOption = useCallback(
//     (
//       selectedOption: MentionTypeaheadOption,
//       nodeToReplace: TextNode | null,
//       closeMenu: () => void
//     ) => {
//       editor.update(() => {
//         const mentionNode = $createMentionNode(
//           selectedOption.name,
//           selectedOption.token
//         );
//         if (nodeToReplace) {
//           nodeToReplace.replace(mentionNode);
//         }
//         mentionNode.select();
//         closeMenu();
//       });
//     },
//     [editor]
//   );

//   const checkForMentionMatch = useCallback(
//     (text: string) => {
//       const mentionMatch = getPossibleQueryMatch(text);
//       const slashMatch = checkForSlashTriggerMatch(text, editor);

//       return !slashMatch && mentionMatch ? mentionMatch : null;
//     },
//     [checkForSlashTriggerMatch, editor]
//   );

//   return (
//     <LexicalTypeaheadMenuPlugin<MentionTypeaheadOption>
//       onQueryChange={setQueryString}
//       onSelectOption={onSelectOption}
//       triggerFn={checkForMentionMatch}
//       options={options}
//       menuRenderFn={(
//         anchorElementRef,
//         { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
//       ) => {
//         const { loadingMention } = React.useContext(reState);
//         const ref = React.useRef<any>(null);
//         React.useEffect(() => {
//           if (ref?.current) {
//             const { elementRight, elementLeft }: any = SizeOfElement(
//               ref?.current
//             );
//             const style: any = ref?.current?.style;

//             if (elementLeft && elementRight) {
//               if (elementRight < 0 && style) {
//                 style.left = `auto`;
//                 style.right = `0px`;
//               } else if (style) {
//                 style.left = `auto`;
//                 style.right = `auto`;
//               }
//             }
//           }
//         }, [SizeOfElement(ref?.current)]);

//         return anchorElementRef && results.length
//           ? ReactDOM.createPortal(
//               <div ref={ref} className={styles.container}>
//                 <ul>
//                   {loadingMention
//                     ? [1, 2, 3, 4, 5].map((nu: number) => (
//                         <Skeleton width="100%" height="40px" />
//                       ))
//                     : options.map((option, i: number) => (
//                         <MentionsTypeaheadMenuItem
//                           index={i}
//                           isSelected={selectedIndex === i}
//                           onClick={() => {
//                             setHighlightedIndex(i);
//                             selectOptionAndCleanUp(option);
//                           }}
//                           onMouseEnter={() => {
//                             setHighlightedIndex(i);
//                           }}
//                           key={option.key}
//                           option={option}
//                         />
//                       ))}
//                 </ul>
//               </div>,
//               anchorElementRef?.current as any
//             )
//           : null;
//       }}
//     />
//   );
// }

export default {}