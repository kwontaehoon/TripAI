import { getBadgeColor } from '../../src/util/styles';

describe('getBadgeColor', () => {
  it('1이면 파란색 배지 클래스를 반환한다', () => {
    expect(getBadgeColor(1)).toBe('bg-blue-100 text-blue-700');
  });

  it('2이면 초록색 배지 클래스를 반환한다', () => {
    expect(getBadgeColor(2)).toBe('bg-green-100 text-green-700');
  });

  it('3이면 분홍색 배지 클래스를 반환한다', () => {
    expect(getBadgeColor(3)).toBe('bg-pink-100 text-pink-700');
  });

  describe('기본값 (보라색)', () => {
    it('0이면 보라색 배지 클래스를 반환한다', () => {
      expect(getBadgeColor(0)).toBe('bg-purple-100 text-purple-700');
    });

    it('4 이상이면 보라색 배지 클래스를 반환한다', () => {
      expect(getBadgeColor(4)).toBe('bg-purple-100 text-purple-700');
      expect(getBadgeColor(10)).toBe('bg-purple-100 text-purple-700');
    });

    it('음수이면 보라색 배지 클래스를 반환한다', () => {
      expect(getBadgeColor(-1)).toBe('bg-purple-100 text-purple-700');
    });
  });

  it('문자열이 아닌 string 타입을 반환한다', () => {
    expect(typeof getBadgeColor(1)).toBe('string');
  });
});
