export interface ItemMenu {
  label: string;
  routerLink?: string[];
  items?: ItemMenu[];
  routerLinkActiveOptions?: IsActiveMatchOptions;
  icon?: string;
  visible?: boolean;
  badge?: string;
  url?: string[];
  target?: string;
  separator?: boolean;
}

export interface IsActiveMatchOptions {
  fragment: 'exact' | 'ignored';
  matrixParams: 'exact' | 'subset' | 'ignored';
  paths: 'exact' | 'subset';
  queryParams: 'exact' | 'subset' | 'ignored';
}
