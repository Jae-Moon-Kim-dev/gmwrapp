import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    /**
     * 셀(td) 요소에 적용할 CSS 클래스 이름입니다.
     */
    cellClassName?: string;
    style?: unknown;
    className?: string;
    rowSpan?: number;
    isRowSpan?: boolean;
  }
}