import { sum, obj } from "../src/util/toHaveBeenCalled"
import { test, expect } from '@jest/globals';       

afterEach(() => {
    jest.restoreAllMocks();
});

test("sum 함수가 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalled();

    // 정보 부족으로 toHaveBeenCalledTimes나 toHaveBeenCalledWith 함수 사용
    // 추적하는 기능을 담당하는 jest.fn을 사용
});

it("sum 함수가 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalled();
})


test("sum 함수가 1번 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalledTimes(1);

    // 몇 번 호출되었는지 정보 제공
});

it("sum 함수가 2번 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalledTimes(2);
})

test("sum 함수가 1, 2와 함께 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalledWith(1, 2);

    // 인수를 확인할 수 있는 함수
});

it("sum 함수가 10, 20와 함께 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(10, 30);
    expect(sumSpy).toHaveBeenCalledWith(10, 30);
})

test("obj.minus 함수가 1번 호출되었다. (spy 함수 생성)", () => {
    const minusSpy = jest.fn(obj.minus);
    minusSpy(1, 2);
    expect(minusSpy).toHaveBeenCalledTimes(1);
});

it("obj.minus 함수가 5번 호출되었다. (spy 함수 생성)", () => {
    const minusSpy = jest.fn(obj.minus);
    minusSpy(1, 2);
    minusSpy(1, 2);
    minusSpy(1, 2);
    minusSpy(1, 2);
    minusSpy(1, 2);
    expect(minusSpy).toHaveBeenCalledTimes(5);
})

test("obj.minus 함수가 1번 호출되었다. (spy 삽입)", () => {
    jest.spyOn(obj, 'minus');
    obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
});

it("obj.minus 함수가 3번 호출되었다. (spy 삽입)", () => {
    jest.spyOn(obj, 'minus');
    obj.minus(1, 2);
    obj.minus(1, 2);
    obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(3);
    // afterEach의 restoreAllMocks로 초기화를 해주지않으면 4가 나옴
})