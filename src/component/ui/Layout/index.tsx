import Layout, { LayoutProps } from "./Layout";
import Menu, { MenuProps } from "./Menu";
import Sidebar, { SidebarProps } from "./Sidebar";
import Footer, { FooterProps } from "./Footer";
import Content, { ContentProps } from "./Content";

type LayoutComponent = React.FC<LayoutProps> & {
  Menu: React.FC<MenuProps>;
  Sidebar: React.FC<SidebarProps>;
  Footer: React.FC<FooterProps>;
  Content: React.FC<ContentProps>;
};

const LayoutWithSubcomponents = Object.assign(Layout, {
  Menu,
  Sidebar,
  Footer,
  Content,
}) as LayoutComponent;

export default LayoutWithSubcomponents;
export type { LayoutProps, MenuProps, SidebarProps, FooterProps, ContentProps };
