import { obj } from "../src/util/toHaveBeenCalled"

test("obj.minus 함수가 1번 호출되었다. (spy 삽입)", () => {
    jest.spyOn(obj, 'minus');
    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(-1);
});

test("obj.minus에 스파이를 스파이를 심고 실행은 안되게", () => {
    jest.spyOn(obj, 'minus').mockImplementation();
    const result = obj.minus(1, 2);
    expect(result).not.toBe(-1);
});

test("obj.minus에 스파이를 스파이를 심고 리턴값을 바꾸게", () => {
    jest.spyOn(obj, 'minus').mockImplementation(() => 5);
    const result = obj.minus(1, 2);
    expect(result).toBe(5);
});

test("obj.minus에 스파이를 스파이를 심고 리턴값이 서로 다르게 나오게", () => {
    jest.spyOn(obj, 'minus')
        .mockImplementationOnce((a, b) => a + b)
        .mockImplementationOnce(() => 5);
    const result1 = obj.minus(1, 2);
    const result2 = obj.minus(1, 2);
    const result3 = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(3);
    expect(result1).toBe(3);
    expect(result2).toBe(5);
    expect(result3).toBe(-1);
});

test("obj.minus에 스파이를 스파이를 심고 리턴값이 서로 다르게 나오게2", () => {
    jest.spyOn(obj, 'minus')
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
    jest.spyOn(obj, 'minus')
        .mockReturnValue(5)
    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(5);
});