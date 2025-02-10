import { test, expect } from '@jest/globals'
import { obj } from "../src/util/toMatchObject"      

test("클래스 비교는 toMatchObject로 해야 한다.", () => {
    expect(obj('hello')).toMatchObject({a: 'hello'});
    expect(obj('hello')).not.toStrictEqual({a: 'hello'});
});