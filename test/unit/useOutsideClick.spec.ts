import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useOutsideClick } from '../../src/hooks/useOutSideClick';

describe('useOutsideClick', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('ref 외부를 클릭하면 콜백이 호출된다', () => {
    const onClickOutside = jest.fn();
    const inner = document.createElement('div');
    container.appendChild(inner);

    const ref = { current: inner };
    renderHook(() => useOutsideClick([ref], onClickOutside));

    // inner 외부(container)를 클릭
    container.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('ref 내부를 클릭하면 콜백이 호출되지 않는다', () => {
    const onClickOutside = jest.fn();
    const inner = document.createElement('div');
    container.appendChild(inner);

    const ref = { current: inner };
    renderHook(() => useOutsideClick([ref], onClickOutside));

    // inner 자체를 클릭
    inner.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('언마운트 시 이벤트 리스너가 제거된다', () => {
    const onClickOutside = jest.fn();
    const inner = document.createElement('div');
    container.appendChild(inner);

    const ref = { current: inner };
    const { unmount } = renderHook(() => useOutsideClick([ref], onClickOutside));

    unmount();

    container.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('빈 ref 배열이면 모든 클릭에서 콜백이 호출되지 않는다', () => {
    const onClickOutside = jest.fn();

    renderHook(() => useOutsideClick([], onClickOutside));

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onClickOutside).not.toHaveBeenCalled();
  });
});
