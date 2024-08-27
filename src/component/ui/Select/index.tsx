/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Icon, Line, useAniState } from "../..";
import useDetectElement from "../../hooks/useDetectElement";
import styles from "./Select.module.css";
import React from "react";

export type TypeOption = {
  value: number | string;
  label?: string;
  object?: any;
  disabled?: boolean;
};

export type SelectTypeProps = {
  width?: number | string;
  height?: number | string;
  options: TypeOption[];
  renderOption?: (value: TypeOption) => React.ReactNode;
  renderSelected?: (value: TypeOption) => React.ReactNode;
  placeholder?: string;
  value?: number | string | null;
  disabled?: boolean;
  onChange?: (value: TypeOption) => void;
  searchLabel?: boolean;
};

export default function Select({
  width = 250,
  height = 40,
  renderOption,
  renderSelected,
  placeholder,
  value,
  options,
  disabled,
  onChange,
  searchLabel = false,
}: SelectTypeProps): JSX.Element {
  const { theme } = useAniState();
  const [valueSelected, setValueSelected] = React.useState<
    number | string | null | undefined
  >(value || null);
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<any>();

  const outer = useDetectElement(ref);

  const [searchValue, setSearchValue] = React.useState<any>();
  const [keySearchValue, setKeySearchValue] = React.useState<any>();

  const valueSelectedView = React.useMemo(() => {
    if (options && options.length && valueSelected) {
      const checkedValue = options.find((val) => val.value === valueSelected);
      if (checkedValue) {
        return renderSelected
          ? renderSelected(checkedValue)
          : checkedValue.label || "";
      }
    }
    return "";
  }, [valueSelected, renderSelected, options]);

  React.useEffect(() => {
    setValueSelected(value);
  }, [value]);

  React.useEffect(() => {
    if (valueSelected !== value && onChange && options.length) {
      const checkedValue = options.find((val) => val.value === valueSelected);
      if (checkedValue) {
        onChange?.(checkedValue);
      }
    }
  }, [valueSelected]);

  React.useEffect(() => {
    if (!outer) {
      setOpen(false);
    }
  }, [outer]);

  React.useEffect(() => {
    if (valueSelected && !open) {
      const checkedValue = options.find((val) => val.value === valueSelected);
      if (checkedValue) {
        setSearchValue(checkedValue);
        setKeySearchValue(checkedValue.label || "");
      }
    }
  }, [value, open]);

  return (
    <div
      className={`${styles.select} ${
        disabled ? styles.disabled : ""
      } ${theme.backgroundColorClass || ""} css-no-copy`}
      style={{
        width,
        minHeight: height,
      }}
      tabIndex={1}
      ref={ref}
    >
      <div onClick={() => setOpen(true)} className={styles.selectedValue}>
        {searchLabel ? (
          <input
            className={styles.input}
            onFocus={() => setOpen(true)}
            placeholder={placeholder || ""}
            onChange={(e: any) => setKeySearchValue(e.target.value)}
            value={open ? keySearchValue || "" : searchValue?.label || ""}
          />
        ) : (
          valueSelectedView || (
            <span className={styles.span}>{placeholder || ""}</span>
          )
        )}
      </div>
      <div
        style={{
          top: height,
          boxShadow: `0px 0px 4px 2px ${theme.boxShadow}`,
        }}
        className={`${styles.optionBox} ${
          open ? styles.optinonBoxOpen : styles.optionBoxClose
        } ${theme.backgroundColorClass}`}
      >
        {options.map((val, i) => {
          return (
            <React.Fragment key={i}>
              <div
                className={`${styles.option} ${
                  val.disabled ? styles.disabled : ""
                } ${val.value === valueSelected ? styles.selected : ""} ${
                  val.label &&
                  keySearchValue &&
                  searchLabel &&
                  val.label
                    .toLowerCase()
                    ?.indexOf(keySearchValue.toLowerCase()) === -1
                    ? styles.none
                    : ""
                }`}
                onClick={() => {
                  setValueSelected(val.value);
                  setOpen(false);
                }}
              >
                {renderOption ? renderOption(val) : val.label || ""}
              </div>
              {i < options?.length - 1 ? <Line /> : <></>}
            </React.Fragment>
          );
        })}
      </div>
      <div onClick={() => setOpen(!open)} className={`${styles.optionBoxIcon}`}>
        <Icon type={open ? "arrow-up" : "arrow-down"} size={16} />
      </div>
    </div>
  );
}
