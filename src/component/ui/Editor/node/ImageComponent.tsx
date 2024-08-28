import type { LexicalEditor, NodeKey } from "lexical";

import * as React from "react";
import { useRef } from "react";

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  maxWidth,
}: {
  altText: string;
  caption: LexicalEditor;
  height: "inherit" | number;
  maxWidth: number;
  nodeKey: NodeKey;
  resizable: boolean;
  showCaption: boolean;
  src: string;
  width: "inherit" | number;
  captionsEnabled: boolean;
}): JSX.Element {
  const imageRef = useRef<null | HTMLImageElement>(null);

  return (
    <>
      <div>
        <img
          src={src}
          alt={altText}
          ref={imageRef}
          style={{
            height,
            maxWidth,
            width,
          }}
        />
      </div>
    </>
  );
}
