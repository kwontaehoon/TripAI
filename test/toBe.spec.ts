import { sum } from "../src/util/toBe"
import { test, expect } from '@jest/globals';

// 첫 번째 인자는 설명
// 두 번째 인자는 테스트 함수       

test("sum 함수에서 두 숫자를 더해야 한다.", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).not.toBe(2);
}); 

it("sum 함수에서 두 숫자를 더해야 한다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 5);
    expect(sumSpy).toHaveBeenCalled();
    expect(sumSpy).toHaveBeenCalledTimes(1);
    expect(sumSpy).toHaveBeenCalledWith(1, 5);
    expect(sumSpy.mock.results[0].value).toBe(6);
    expect(sumSpy(1, 5)).toBe(6);
})