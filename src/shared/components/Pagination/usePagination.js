import { useMemo } from 'react';

const DOTS = '...';

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
};

const usePagination = ({
  totalItems,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  return useMemo(() => {
    const totalPageCount = Math.ceil(totalItems / pageSize);

    if (totalPageCount <= 0) {
      return [];
    }

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPageCount - 1;

    if (!showLeftDots && showRightDots) {
      const leftItems = 3 + siblingCount * 2;

      return [...range(1, leftItems), DOTS, totalPageCount];
    }

    if (showLeftDots && !showRightDots) {
      const rightItems = 3 + siblingCount * 2;

      return [
        1,
        DOTS,
        ...range(totalPageCount - rightItems + 1, totalPageCount),
      ];
    }

    return [
      1,
      DOTS,
      ...range(leftSibling, rightSibling),
      DOTS,
      totalPageCount,
    ];
  }, [totalItems, pageSize, siblingCount, currentPage]);
};

export { DOTS };
export default usePagination;
