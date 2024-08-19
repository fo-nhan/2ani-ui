export type IconTypeMap =
  | "house"
  | "close"
  | "magnifying-glass"
  | "user"
  | "user-outline";

export type IconTypeProps = React.HTMLAttributes<HTMLOrSVGElement> & {
  type: IconTypeMap;
  size?: number;
  color?: string;
};
