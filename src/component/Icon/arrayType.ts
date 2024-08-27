export type IconTypeMap =
  | "house"
  | "close"
  | "magnifying-glass"
  | "user"
  | "user-outline"
  | "eye-hidden"
  | "eye-view"
  | "comment"
  | "email"
  | "filter"
  | "star"
  | "comment-outline"
  | "bell"
  | "bell-outline"
  | "star-outline"
  | "image"
  | "image-outline"
  | "emoji"
  | "calendar"
  | "emoji-outline"
  | "arrow-down"
  | "arrow-up"
  | "arrow-left"
  | "arrow-right"
  | "trash"
  | "bracket"
  | "repeat"
  | "angle-right"
  | "angle-left"
  | "check"

export type IconTypeProps = React.HTMLAttributes<HTMLOrSVGElement> & {
  type: IconTypeMap;
  size?: number;
  color?: string;
};
