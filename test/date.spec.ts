import { after3days } from "../src/util/date";

test('3일 후를 리턴한다.', () => {
    const date = jest.useFakeTimers().setSystemTime(new Date(2024, 3, 9));
    console.log(new Date());
    console.log(date);
    expect(after3days()).toStrictEqual(new Date(2024, 3, 12));
})

// 부동 소수점
test('0.1+0.2는 0.3', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
})

afterEach(() => {
    jest.useRealTimers();
})