import { after3days } from '../../src/util/date';

describe('after3days', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Date 객체를 반환한다', () => {
    expect(after3days()).toBeInstanceOf(Date);
  });

  it('현재 날짜에서 정확히 3일 후를 반환한다', () => {
    jest.setSystemTime(new Date('2025-01-01T00:00:00.000Z'));

    const result = after3days();

    expect(result.getUTCFullYear()).toBe(2025);
    expect(result.getUTCMonth()).toBe(0); // January (0-indexed)
    expect(result.getUTCDate()).toBe(4);  // 1 + 3
  });

  it('월말 날짜에서 다음 달로 올바르게 넘어간다', () => {
    jest.setSystemTime(new Date('2025-01-30T00:00:00.000Z'));

    const result = after3days();

    expect(result.getUTCMonth()).toBe(1); // February
    expect(result.getUTCDate()).toBe(2);  // 30 + 3 = 2월 2일
  });

  it('연말 날짜에서 다음 해로 올바르게 넘어간다', () => {
    jest.setSystemTime(new Date('2024-12-30T00:00:00.000Z'));

    const result = after3days();

    expect(result.getUTCFullYear()).toBe(2025);
    expect(result.getUTCMonth()).toBe(0); // January
    expect(result.getUTCDate()).toBe(2);  // 12/30 + 3 = 1/2
  });

  it('윤년 2월 말일에서 올바르게 계산한다', () => {
    // 2024년은 윤년 (2/29 존재)
    jest.setSystemTime(new Date('2024-02-28T00:00:00.000Z'));

    const result = after3days();

    expect(result.getUTCFullYear()).toBe(2024);
    expect(result.getUTCMonth()).toBe(2); // March
    expect(result.getUTCDate()).toBe(2);  // 2/28 + 3 = 3/2
  });
});
