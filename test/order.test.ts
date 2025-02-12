import { first, second, third } from "../src//util/order";

test('first -> second -> third', () => {
    const spy1 = jest.fn(first);
    const spy2 = jest.fn(second);
    const spy3 = jest.fn(third);
    spy1();
    spy2();
    spy3();
    // expect(spy1.mock.invocationCallOrder[0]).toBeLessThan(spy2.mock.invocationCallOrder[0]);
    expect(spy1).toHaveBeenCalledBefore(spy2);

    // expect(spy1.mock.invocationCallOrder[0]).toBeGreaterThan(spy2.mock.invocationCallOrder[0]);
    expect(spy3).toHaveBeenCalledAfter(spy2);
})