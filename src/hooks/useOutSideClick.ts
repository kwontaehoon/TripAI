import { useEffect } from 'react';

export function useOutsideClick(
  refs: React.RefObject<HTMLElement | null>[],
  onClickOutside: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideAny = refs.some(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );
      if (clickedOutsideAny) {
        onClickOutside();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [refs, onClickOutside]);
}
