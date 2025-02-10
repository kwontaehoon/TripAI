import { sum, obj } from "../src/util/toHaveBeenCalled"
import { test, expect } from '@jest/globals';       

test("sum 함수가 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalled();

    // 정보 부족으로 toHaveBeenCalledTimes나 toHaveBeenCalledWith 함수 사용
    // 추적하는 기능을 담당하는 jest.fn을 사용
});


test("sum 함수가 1번 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalledTimes(1);

    // 몇 번 호출되었는지 정보 제공
});

test("sum 함수가 1, 2와 함께 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalledWith(1, 2);

    // 인수를 확인할 수 있는 함수
}); 

test("obj.minus 함수가 1번 호출되었다. (spy 함수 생성)", () => {
    const minusSpy = jest.fn(obj.minus);
    minusSpy(1, 2);
    expect(minusSpy).toHaveBeenCalledTimes(1);
});

test("obj.minus 함수가 1번 호출되었다. (spy 삽입)", () => {
    jest.spyOn(obj, 'minus');
    obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
});