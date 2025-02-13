import axios from 'axios';
import { obj } from '../src/util/module'

// jest mock을 사용하면 객체인 obj를 통째로 바꿀 수 있다.
// 호이스팅 됨
jest.mock('../src/util/module', () => {
    // return {
    //     obj: { a: 'b' },
    //     prop: 'hello'
    // }
    return {
        ...jest.requireActual('../src/util/module'),
        obj: {
            ...jest.requireActual('../src/util/module').obj,
            method3: jest.fn()
        },
        method3() {
            return 'method3'
        }
    }
});

jest.mock('axios', () => {
    return { 'haha': '바꿈' };
});

test('모듈을 전부 모킹', () => {
    jest.replaceProperty(obj, 'prop', 'replaced'); // 속성 수정할 때 사용
    console.log(obj);
})

test('axios를 전부 모킹', () => {
    console.log(axios);
})