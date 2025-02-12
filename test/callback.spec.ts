import { timer } from "../src/util/callback";


// 콜백함수 보다는 Promise 사용
test('타이머 잘 실행 되나?', (done) => {
    timer((message: string) => {
        expect(message).toBe('success');
        done();
    })
}, 25_000)

test('시간아 빨리가라!', (done) => {
    expect.assertions(1);
    jest.useFakeTimers();
    timer((message: string) => {
        expect(message).toBe('success');
        done();
    })
    // jest.runAllTimers();
    jest.advanceTimersByTime(10_000)
})