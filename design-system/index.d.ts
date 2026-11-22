import type * as React from 'react';

export interface NavItem { label: string; href?: string; active?: boolean }

/** The whole page: tiled tablecloth, fixed 780px wrapper, header, posts column, sidebar, footer. */
export interface BlogShellProps { header?: React.ReactNode; sidebar?: React.ReactNode; footer?: React.ReactNode; children?: React.ReactNode }
export declare function BlogShell(props: BlogShellProps): React.ReactElement;

export interface BlogHeaderProps { title?: string; subtitle?: string; href?: string; nav?: NavItem[]; /** marquee text, or false to hide */ marquee?: string | false }
export declare function BlogHeader(props: BlogHeaderProps): React.ReactElement;

export interface BlogFooterProps { badges?: WebBadgeProps[]; copyright?: string; updated?: string; /** Satire notice. Required on every page; the default is used if omitted. */ notice?: string }
export declare function BlogFooter(props: BlogFooterProps): React.ReactElement;

export interface MarqueeProps { children: React.ReactNode; /** seconds for one pass, default 18 */ seconds?: number }
export declare function Marquee(props: MarqueeProps): React.ReactElement;

export interface BlogPostProps {
  title: string; children?: React.ReactNode; href?: string;
  /** default "Ödön" */ author?: string;
  /** "2026.11.22. 23:47" */ date?: string;
  tags?: string[]; comments?: number; isNew?: boolean;
  /** Ketchup-index 0–5 */ rating?: number;
  /** show "Tovább »" (homepage excerpts) */ more?: boolean;
}
export declare function BlogPost(props: BlogPostProps): React.ReactElement;

export interface DigicamPhotoProps { src?: string; alt?: string; /** px, default 320 (4:3) */ width?: number; /** "'08 11 22", or false */ date?: string | false; caption?: string; align?: 'left' | 'right' }
export declare function DigicamPhoto(props: DigicamPhotoProps): React.ReactElement;

export interface EditorNoteProps { children: React.ReactNode; /** default "Szerk. megj.:" */ label?: string }
export declare function EditorNote(props: EditorNoteProps): React.ReactElement;

export interface Ingredient { qty?: string; name: string; note?: string }
export interface RecipeBoxProps { title?: string; time?: string; servings?: string; /** Könnyű | Közepes | Hívd a tűzoltókat */ difficulty?: string; drink?: string; ingredients?: Ingredient[] }
export declare function RecipeBox(props: RecipeBoxProps): React.ReactElement;

export interface Step { text: string; /** Ödön's aside, green Comic Sans */ note?: string }
export interface StepListProps { steps: (string | Step)[]; title?: string }
export declare function StepList(props: StepListProps): React.ReactElement;

export interface NutritionRow { label: string; value: string; dv?: string; joke?: boolean }
export interface NutritionTableProps { rows: NutritionRow[]; title?: string; footnote?: string }
export declare function NutritionTable(props: NutritionTableProps): React.ReactElement;

export interface KetchupRatingProps { /** 0–5; more drops = worse */ value: number; max?: number; label?: string; hideTitle?: boolean; hideLabel?: boolean; className?: string }
export declare function KetchupRating(props: KetchupRatingProps): React.ReactElement;

export interface SidebarLink { label: string; href?: string; count?: number; isNew?: boolean }
export interface SidebarBoxProps { title: string; links?: SidebarLink[]; children?: React.ReactNode }
export declare function SidebarBox(props: SidebarBoxProps): React.ReactElement;

export interface VisitorCounterProps { value?: number; /** zero padding, default 7 */ digits?: number; label?: string; since?: string }
export declare function VisitorCounter(props: VisitorCounterProps): React.ReactElement;

export interface TagCloudProps { tags: { label: string; /** 1–5 */ weight?: number; href?: string }[] }
export declare function TagCloud(props: TagCloudProps): React.ReactElement;

export interface PollProps { question: string; options: { label: string; votes: number }[]; /** unique radio group name per page */ name?: string; showResults?: boolean; totalLabel?: string }
export declare function Poll(props: PollProps): React.ReactElement;

export interface Comment { name?: string; date: string; text: string; url?: string; /** Ödön's own replies */ isAuthor?: boolean }
export interface CommentListProps { comments: Comment[]; title?: string; /** default true */ showForm?: boolean }
export declare function CommentList(props: CommentListProps): React.ReactElement;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface NewBadgeProps { children?: React.ReactNode; /** default true */ blink?: boolean }
export declare function NewBadge(props: NewBadgeProps): React.ReactElement;

export interface WebBadgeProps { left?: string; right?: string; children?: React.ReactNode; tone?: 'red' | 'blue' | 'black' | 'yellow' | 'green'; href?: string; title?: string }
export declare function WebBadge(props: WebBadgeProps): React.ReactElement;

export interface PixelDropProps { on?: boolean }
export declare function PixelDrop(props: PixelDropProps): React.ReactElement;

declare global {
  interface Window {
    Proligasztro: {
      BlogShell: typeof BlogShell; BlogHeader: typeof BlogHeader; BlogFooter: typeof BlogFooter; Marquee: typeof Marquee;
      BlogPost: typeof BlogPost; DigicamPhoto: typeof DigicamPhoto; EditorNote: typeof EditorNote; RecipeBox: typeof RecipeBox;
      StepList: typeof StepList; NutritionTable: typeof NutritionTable; KetchupRating: typeof KetchupRating; SidebarBox: typeof SidebarBox;
      VisitorCounter: typeof VisitorCounter; TagCloud: typeof TagCloud; Poll: typeof Poll; CommentList: typeof CommentList;
      Button: typeof Button; NewBadge: typeof NewBadge; WebBadge: typeof WebBadge; PixelDrop: typeof PixelDrop;
    };
  }
}
