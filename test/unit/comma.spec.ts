import { comma } from '../../src/util/comma';

describe('comma', () => {
  describe('priceFlag = true (₩ 표시)', () => {
    it('1000 → ₩ 1,000', () => {
      expect(comma(1000, true)).toBe('₩ 1,000');
    });

    it('1000000 → ₩ 1,000,000', () => {
      expect(comma(1000000, true)).toBe('₩ 1,,000,000');
    });

    it('0 → ₩ 0', () => {
      expect(comma(0, true)).toBe('₩ 0');
    });
  });

  describe('priceFlag = false (숫자만)', () => {
    it('1000 → 1,000', () => {
      expect(comma(1000, false)).toBe('1,000');
    });

    it('1000000 → 1,000,000', () => {
      expect(comma(1000000, false)).toBe('1,000,000');
    });

    it('999 → 999 (쉼표 없음)', () => {
      expect(comma(999, false)).toBe('999');
    });
  });
});
