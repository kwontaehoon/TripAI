import { renderHook, act } from '@testing-library/react';

// Jotai와 store 모킹
const mockSetIntroModal = jest.fn();
jest.mock('jotai', () => ({
  useSetAtom: jest.fn(() => mockSetIntroModal),
  atom: jest.fn((val: unknown) => ({ init: val })),
}));
jest.mock('@/store/ai', () => ({
  introModalAtom: { init: false },
}));

import { useIntroModal } from '../../src/hooks/useIntroModal';

describe('useIntroModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    mockSetIntroModal.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('localStorage에 기록이 없으면 모달을 표시한다', async () => {
    renderHook(() => useIntroModal());

    await act(async () => {
      jest.runAllTimers();
    });

    expect(mockSetIntroModal).toHaveBeenCalledWith(true);
  });

  it('마지막 표시 후 24시간이 지났으면 모달을 표시한다', async () => {
    const oneDayAgo = Date.now() - 25 * 60 * 60 * 1000; // 25시간 전
    localStorage.setItem('tripai-intro-last-shown', String(oneDayAgo));

    renderHook(() => useIntroModal());

    await act(async () => {
      jest.runAllTimers();
    });

    expect(mockSetIntroModal).toHaveBeenCalledWith(true);
  });

  it('마지막 표시 후 24시간이 지나지 않았으면 모달을 표시하지 않는다', async () => {
    const recentTime = Date.now() - 1 * 60 * 60 * 1000; // 1시간 전
    localStorage.setItem('tripai-intro-last-shown', String(recentTime));

    renderHook(() => useIntroModal());

    await act(async () => {
      jest.runAllTimers();
    });

    expect(mockSetIntroModal).not.toHaveBeenCalled();
  });

  it('언마운트 시 타이머가 정리된다', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const { unmount } = renderHook(() => useIntroModal());
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
