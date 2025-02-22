import { obj } from "../src/util/toHaveBeenCalled"

let spyFn: jest.SpyInstance;
let beforeEachCount = 0;
let afterEachCount = 0;

beforeEach(() => {
    console.log('outside beforeEach: ', ++beforeEachCount);
});

afterEach(() => {
    console.log('outside afterEach: ', ++afterEachCount);
    jest.restoreAllMocks();
});

describe('beforeEach/afterEach 적용', () => {

    beforeEach(() => {
        console.log('beforeEach: ', ++beforeEachCount);
    });

    afterEach(() => {
        console.log('afterEach: ', ++afterEachCount);
        spyFn.mockRestore();
    
        // jest.clearAllMocks;
        // jest.resetAllMocks;
        // jest.restoreAllMocks;
    });

    test("obj.minus 함수가 1번 호출되었다. (spy 삽입)", () => {
        spyFn = jest.spyOn(obj, 'minus');
        const result = obj.minus(1, 2);
        expect(obj.minus).toHaveBeenCalledTimes(1);
        expect(result).toBe(-1);
    });
    
    test("obj.minus에 스파이를 스파이를 심고 실행은 안되게", () => {
        spyFn = jest.spyOn(obj, 'minus').mockImplementation();
        const result = obj.minus(1, 2);
        expect(result).not.toBe(-1);
    });
    
    test("obj.minus에 스파이를 스파이를 심고 리턴값을 바꾸게", () => {
        spyFn = jest.spyOn(obj, 'minus').mockImplementation(() => 5);
        const result = obj.minus(1, 2);
        expect(result).toBe(5);
    });
    
    test("obj.minus에 스파이를 스파이를 심고 리턴값이 서로 다르게 나오게", () => {
        spyFn = jest.spyOn(obj, 'minus')
            .mockImplementationOnce((a, b) => a + b)
            .mockImplementationOnce(() => 5);
        const result1 = obj.minus(1, 2);
        const result2 = obj.minus(1, 2);
        const result3 = obj.minus(1, 2);
        expect(obj.minus).toHaveBeenCalledTimes(3);
        expect(result1).toBe(3);
        expect(result2).toBe(5);
        expect(result3).toBe(-1);
        // spyFn.mockClear(); // Times, With 초기화
        // spyFn.mockReset(); // mockClear + mockImplementation(() => {})
        // spyFn.mockRestore(); // 아예 전부 없애버림
    });
    
    test("obj.minus에 스파이를 스파이를 심고 리턴값이 서로 다르게 나오게2", () => {
        spyFn = jest.spyOn(obj, 'minus')
            .mockImplementationOnce((a, b) => a + b)
            .mockImplementationOnce(() => 5)
            .mockImplementation(() => 3);
        const result1 = obj.minus(1, 2);
        const result2 = obj.minus(1, 2);
        const result3 = obj.minus(1, 2);
        expect(obj.minus).toHaveBeenCalledTimes(3);
        expect(result1).toBe(3);
        expect(result2).toBe(5);
        expect(result3).toBe(3);
    });
    
    test("obj.minus에 스파이를 스파이를 심고 리턴값이 다르게 나오게(mockReturnValue)", () => {
        spyFn = jest.spyOn(obj, 'minus')
            .mockReturnValue(5)
        const result = obj.minus(1, 2);
        expect(obj.minus).toHaveBeenCalledTimes(1);
        expect(result).toBe(5)
    });
})


beforeAll(() => {
    console.log('이 파일에 준비사항 실행');
});

afterAll(() => {
    console.log('모든 테스트가 끝난 후'); 
});

// test skip
test.skip("obj.minus 함수가 1번 호출되었다. (spy 삽입)", () => {
    spyFn = jest.spyOn(obj, 'minus');
    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(-1);
});

// 나중에 만들 때
test.todo("obj.minus 함수가 1번 호출되었다. (spy 삽입)");

// describe skip
describe.skip('', () => {});