
// 중복 줄이기

test('1 더하기 1은 2', () => {
    expect(1 + 1).toBe(2);
})
test('2 더하기 3은 5', () => {
    expect(2 + 3).toBe(5);
})
test('3 더하기 4은 7', () => {
    expect(3 + 4).toBe(7);
})

test.each([
    [1, 1, 2],
    [2, 3, 5],
    [3, 4, 7]
])('%i 더하기 %i %i', (a, b, c) => {
    expect(a + b).toBe(c);
})

it.each([
    [1, 1, 2],
    [2, 3, 5]
])('%i 더하기 %i %i', (a, b, c) => {
    expect(a + b).toBe(c);
})

test.each([
    { a: 1, b: 1, c: 2 },
    { a: 2, b: 3, c: 5 },
    { a: 3, b: 4, c: 7 }
])('$a 더하기 $b $c', ({ a, b, c }) => {
    expect(a + b).toBe(c);
})

it.each([
    { a: 1, b: 4, c: 5 }
])('$a 더하기 $b $c', ({ a, b, c }) => {
    expect(a + b).toBe(c);
})
