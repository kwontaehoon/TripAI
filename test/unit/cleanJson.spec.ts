import { cleanJson } from '../../src/util/cleanJson';

describe('cleanJson', () => {
  describe('코드 블록 제거', () => {
    it('```json 코드 블록을 제거한다', () => {
      const input = '```json\n{"key": "value"}\n```';
      expect(cleanJson(input)).toBe('{"key": "value"}');
    });

    it('``` 만 있는 코드 블록을 제거한다', () => {
      const input = '```{"key": "value"}```';
      expect(cleanJson(input)).toBe('{"key": "value"}');
    });
  });

  describe('주석 제거', () => {
    it('// 한 줄 주석을 제거한다', () => {
      const input = '{"key": "value"} // 주석';
      const result = cleanJson(input);
      expect(result).not.toContain('//');
      expect(result).toContain('"key"');
    });

    it('/* */ 블록 주석을 제거한다', () => {
      const input = '{"key": /* 블록 주석 */ "value"}';
      const result = cleanJson(input);
      expect(result).not.toContain('/*');
      expect(result).not.toContain('*/');
      expect(result).toContain('"key"');
    });
  });

  describe('trailing comma 제거', () => {
    it('객체의 마지막 쉼표를 제거한다', () => {
      const input = '{"key": "value",}';
      const result = cleanJson(input);
      expect(result).not.toContain(',}');
    });

    it('배열의 마지막 쉼표를 제거한다', () => {
      const input = '["a", "b",]';
      const result = cleanJson(input);
      expect(result).not.toContain(',]');
    });
  });

  describe('따옴표 변환', () => {
    it("홑따옴표를 쌍따옴표로 변환한다", () => {
      const input = "{'key': 'value'}";
      expect(cleanJson(input)).toBe('{"key": "value"}');
    });
  });

  describe('공백 정규화', () => {
    it('앞뒤 공백을 제거한다', () => {
      const input = '  {"key": "value"}  ';
      const result = cleanJson(input);
      expect(result.startsWith('{')).toBe(true);
      expect(result.endsWith('}')).toBe(true);
    });

    it('연속 공백을 단일 공백으로 정규화한다', () => {
      const input = '{"key":   "value"}';
      expect(cleanJson(input)).not.toContain('  ');
    });
  });

  describe('실제 Gemini AI 응답 시나리오', () => {
    it('복합적인 정제를 올바르게 처리한다', () => {
      const input = '```json\n{"places": [{"name": "경복궁",}]} // 서울 명소\n```';
      const result = cleanJson(input);
      expect(result).not.toContain('```');
      expect(result).not.toContain(',]');
      expect(result).not.toContain('//');
      expect(result).toContain('경복궁');
    });

    it('정제 후 JSON.parse가 가능한 문자열을 반환한다', () => {
      const input = [
        '```json',
        '{',
        '  "places": [',
        '    {"name": "경복궁",} // trailing comma',
        '  ],',
        '}',
        '```',
      ].join('\n');
      const result = cleanJson(input);
      expect(() => JSON.parse(result)).not.toThrow();
    });

    it('중첩 객체에서도 trailing comma를 올바르게 제거한다', () => {
      const input = '{"a": {"b": [1, 2,],},}';
      const result = cleanJson(input);
      expect(result).not.toContain(',]');
      expect(result).not.toContain(',}');
    });
  });
});
