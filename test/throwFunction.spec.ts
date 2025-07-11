import { error, customeError, CustomeError } from "../src/util/throwFunction";

test('error가 잘 난다.', () => {
    expect(() => error()).toThrow(Error);
    expect(() => customeError()).toThrow(CustomeError);
})

it('error가 잘 난다.', () => {
    expect(() => error()).toThrow(Error);
})

test('error가 잘 난다(try/catch)', () => {
    try {
        error();
    } catch(err) {
        expect(err).toStrictEqual(new Error());
    }
})

it('error가 잘 난다(try/.catch)', () => {
    try {
        error();
    } catch(err) {
        // expect(err).toStrictEqual(new Error());
        console.log(123);
    }
})