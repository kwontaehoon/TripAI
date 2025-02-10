import { sum } from "../src/util/toBe"
import { test, expect } from '@jest/globals'
import { obj } from "../src/util/toStrictEqul"

// 첫 번째 인자는 설명
// 두 번째 인자는 테스트 함수       

test("sum 함수에서 두 숫자를 더해야 한다.", () => {
    expect(obj()).toStrictEqual({ a: "hello"});
});

test("배열끼리도 toStrictEqual 써야한다.", () => {
    expect([1,2,3,]).toStrictEqual([1,2,3]);
    expect([1,2,3]).not.toBe([1,2,3]);
    
    expect(obj()).toStrictEqual({ a: "hello"});
}); 