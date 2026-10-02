/**
 * The closed set of icons the interface can render.
 *
 * Declared apart from the component so data files can reference an icon by name
 * without importing React, and so a test can assert the renderer covers every
 * name: adding a member here without a matching path is a compile error in
 * `Icon.tsx`.
 */
export type IconName =
  | "github"
  | "linkedin"
  | "npm"
  | "external"
  | "live"
  | "mail"
  | "download"
  | "print"
  | "document"
  | "arrow"
  | "menu"
  | "close"
  | "sun"
  | "moon"
  | "gauge"
  | "beaker"
  | "shield"
  | "search"
  | "layers"
  | "package"
  | "globe"
  | "clock"
  | "check";
