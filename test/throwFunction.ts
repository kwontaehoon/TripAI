export const error = () => {
    throw new Error();
}

export class CustomeError extends Error {}
export const customeError = () => {
    throw new CustomeError();
}