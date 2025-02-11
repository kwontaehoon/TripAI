import { timer } from "../src/util/callback";


// 콜백함수 보다는 Promise 사용
test('타이머 잘 실행 되나?', (done) => {
    timer((message: string) => {
        expect(message).toBe('success');
        done();
    })
})