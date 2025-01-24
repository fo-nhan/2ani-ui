import React from "react";
import styles from "./Menu.module.css";
import Box, { BoxTypeProps } from "../Box";
import { IconTypeMap } from "../../Icon/arrayType";
import Icon from "../../Icon";
import { AnimateType, BackgroundType, BorderRadiusType } from "../Box/type";
import View, { ViewTypeProps } from "../View";
import Text, { TextProps } from "../Text";
import Popup from "../Popup";

export type MenuConfigProps = {
  boxProps?: BoxTypeProps;
  customContent?: React.ReactNode;
  sideBar?: {
    openIcon?: IconTypeMap;
    closeIcon?: IconTypeMap;
    openColor?: string;
    closeColor?: string;
    openBackground?: BackgroundType;
    closeBackground?: BackgroundType;
    borderRadius?: BorderRadiusType;
    sizeIcon?: number | string;
    animation?: AnimateType;
    width: number | string;
    boxProps?: BoxTypeProps;
    fsc?: (open: boolean) => void;
  };
  logo?: {
    url?: string;
    img: string;
    width: number | string;
    fsc?: Function;
    alt?: string;
    imgProps?: ViewTypeProps;
    name?: string;
    nameProps?: TextProps;
    nameHiddenPc?: boolean;
  };
  search?: {
    width: number | string;
    searchView?: React.ReactNode;
    noOption?: boolean;
    onSearch?: Function;
    onSelectedItem?: (
      item: {
        id: number | string;
        img?: string;
        title: string;
        description?: string;
        type?: "history" | "new";
      },
      e?: Event
    ) => void;
    data?: {
      id: number | string;
      img?: string;
      title: string;
      description?: string;
      type?: "history" | "new";
    }[];
    loading?: boolean;
    placeholder?: React.ReactNode | string;
  };
  feat?: {
    icon?: IconTypeMap;
    img?: string;
    title?: string;
    popupContent?: React.ReactNode;
    popup?: boolean;
    popupParentProps?: BoxTypeProps;
    popupChildrenProps?: BoxTypeProps;
    fsc?: Function;
  }[];
};

export interface MenuProps {
  children?: React.ReactNode;
  position?: "fixed" | "sticky";
  placement?: "top" | "bottom";
  top?: number;
  bottom?: number;
  height?: number;
  className?: string;
  menuConfig?: MenuConfigProps;
}

const Menu: React.FC<MenuProps> = ({
  children,
  position = "sticky",
  placement = "top",
  top = 0,
  bottom = 0,
  height = 50,
  className = "",
  menuConfig,
}) => {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [animateSidebar, setAnimateSidebar] = React.useState<
    AnimateType | undefined
  >(undefined);

  const handClickSideBar = () => {
    if (menuConfig?.sideBar?.animation) {
      setAnimateSidebar(menuConfig?.sideBar?.animation);
    }
    setTimeout(() => {
      setAnimateSidebar(undefined);
      menuConfig?.sideBar?.fsc?.(!openSidebar);
      setOpenSidebar(!openSidebar);
    }, 300);
  };

  return (
    <nav
      style={placement === "top" ? { top, height } : { bottom, height }}
      className={`${styles.menu} ${styles[position]} ${className}`}
    >
      {children || (
        <div className={styles.menuContainer}>
          {menuConfig && (
            <Box
              width={"100%"}
              height={"100%"}
              flex="flex"
              align="center"
              background="auto"
              {...menuConfig.boxProps}
            >
              {menuConfig.customContent || (
                <>
                  {menuConfig.sideBar && (
                    <div
                      style={{ maxWidth: menuConfig.sideBar.width }}
                      className={styles.menuSidebar}
                    >
                      <Box
                        width={40}
                        height={40}
                        flex="flexCenter"
                        align="center"
                        cursor="pointer"
                        background={
                          (openSidebar
                            ? menuConfig?.sideBar?.openBackground
                            : menuConfig?.sideBar?.closeBackground) || "auto"
                        }
                        animation={animateSidebar}
                        borderRadius={
                          menuConfig?.sideBar?.borderRadius || undefined
                        }
                        {...(menuConfig.sideBar.boxProps || {})}
                        onClick={handClickSideBar}
                      >
                        <Icon
                          size={menuConfig.sideBar.sizeIcon || 20}
                          color={
                            (openSidebar
                              ? menuConfig?.sideBar?.openColor
                              : menuConfig?.sideBar?.closeColor) || ""
                          }
                          type={
                            (openSidebar
                              ? menuConfig.sideBar.openIcon
                              : menuConfig.sideBar.closeIcon) || "menu"
                          }
                        />
                      </Box>
                    </div>
                  )}

                  {menuConfig.logo && (
                    <div
                      style={{ maxWidth: menuConfig.logo.width }}
                      className={styles.menuLogo}
                    >
                      <a
                        href={menuConfig.logo.url || "/"}
                        onClick={(e) => menuConfig.logo?.fsc?.(e)}
                      >
                        <View
                          alt={menuConfig.logo.alt || "Logo"}
                          width={50}
                          {...(menuConfig?.logo?.imgProps || {})}
                          src={menuConfig.logo.img}
                        />
                        {menuConfig.logo.name && (
                          <Text
                            weight="500"
                            size="h5"
                            className={
                              styles[
                                menuConfig?.logo?.nameHiddenPc
                                  ? "nameHiddenPc"
                                  : ""
                              ]
                            }
                            {...(menuConfig?.logo?.nameProps || {})}
                          >
                            {menuConfig.logo.name}
                          </Text>
                        )}
                      </a>
                    </div>
                  )}

                  {menuConfig.search && (
                    <div
                      style={{ maxWidth: menuConfig.search.width }}
                      className={styles.menuSearch}
                    >
                      <Popup
                        propsParent={{
                          width: "100%",
                          height: "100%",
                          flex: "flexCenter",
                          align: "center",
                        }}
                        propsChildren={{
                          width: 300,
                          borderRadius: 10,
                        }}
                        noPopup={menuConfig.search.noOption}
                        content={
                          menuConfig.search.searchView || (
                            <Box
                              flex="flexColumn"
                              justify="center"
                              align="center"
                              gap={5}
                              paddingY={10}
                              paddingX={5}
                              width={"100%"}
                            >
                              {menuConfig.search.data?.length
                                ? menuConfig.search.data.map((val, i) => (
                                    <Box
                                      flex="flex"
                                      height={50}
                                      gap={10}
                                      width={"100%"}
                                      backgroundHover="info"
                                      cursor="pointer"
                                      paddingX={10}
                                      key={i}
                                      onClick={(e) =>
                                        menuConfig?.search?.onSelectedItem?.(
                                          val,
                                          e
                                        )
                                      }
                                    >
                                      {val.img && (
                                        <Box
                                          width={"100%"}
                                          height={"100%"}
                                          flex="flexCenter"
                                          align="center"
                                          maxWidth={40}
                                        >
                                          <View
                                            src={val.img}
                                            width={40}
                                            height={40}
                                            borderRadius={10}
                                          />
                                        </Box>
                                      )}
                                      <Box
                                        flex="flexColumn"
                                        width={"100%"}
                                        justify="center"
                                        maxWidth={
                                          val.type && val.img
                                            ? 200
                                            : val.type
                                            ? 250
                                            : val.img
                                            ? 200
                                            : "100%"
                                        }
                                      >
                                        <Text
                                          weight="500"
                                          color="auto"
                                          size="h7"
                                          overflow="ellipsis"
                                        >
                                          {val.title}
                                        </Text>
                                        {val.description && (
                                          <Text
                                            weight="400"
                                            color="default"
                                            size="h8"
                                            overflow="ellipsis"
                                          >
                                            {val.description}
                                          </Text>
                                        )}
                                      </Box>
                                      {val.type && (
                                        <Box
                                          width={"100%"}
                                          height={"100%"}
                                          flex="flexEnd"
                                          align="center"
                                          maxWidth={50}
                                        >
                                          <Icon
                                            type={
                                              val.type === "history"
                                                ? "oclock"
                                                : "magnifying-glass"
                                            }
                                            color="grey"
                                          />
                                        </Box>
                                      )}
                                    </Box>
                                  ))
                                : menuConfig.search.placeholder ||
                                  "Không có dữ liệu"}
                            </Box>
                          )
                        }
                        type="click"
                      >
                        <div className={styles.menuSearchInput}>
                          <div className={styles.menuSearchInputIcon}>
                            <Icon type="magnifying-glass" color="grey" />
                          </div>
                          <input
                            placeholder="Tìm kiếm trên ABC"
                            onChange={(e) => menuConfig.search?.onSearch?.(e)}
                          />
                        </div>
                      </Popup>
                    </div>
                  )}
                  {menuConfig.feat && (
                    <Box
                      width={"100%"}
                      height={"100%"}
                      flex="flexEnd"
                      align="center"
                      gap={5}
                    >
                      {menuConfig.feat.map((val, i) => (
                        <Popup
                          key={i}
                          type="click"
                          noPopup={!val.popup}
                          content={val.popupContent}
                          propsChildren={val.popupChildrenProps}
                          propsParent={val.popupParentProps}
                        >
                          <Box
                            height={40}
                            minWidth={40}
                            flex="flexCenter"
                            align="center"
                            borderRadius={30}
                            background="default"
                            paddingX={10}
                            gap={5}
                            cursor="pointer"
                            onClick={(e) => val.fsc?.(e)}
                          >
                            {val.icon && <Icon type={val.icon} />}
                            {val.title && (
                              <Text size="h7" weight="500">
                                {val.title}
                              </Text>
                            )}
                          </Box>
                        </Popup>
                      ))}
                    </Box>
                  )}
                </>
              )}
            </Box>
          )}
        </div>
      )}
    </nav>
  );
};

export default Menu;
