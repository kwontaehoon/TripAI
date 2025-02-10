class TestObj {
    a: string;
    constructor(str: string) {
        this.a = str;
    }
}
export const obj = (str: string) => {
    return new TestObj(str);
}