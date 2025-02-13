jest.mock('../src/util/mockFunc', () => {
    // double만 모킹 single만 오긴하는데 모킹은 안됨
    return {
        ...jest.requireActual('../src/util/mockFunc'),
        double: jest.fn()
    }
});
