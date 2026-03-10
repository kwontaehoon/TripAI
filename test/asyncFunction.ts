export const okPromise = () => {
    return Promise.resolve('ok');

}

export const noPromise = () => {
    return Promise.reject('no');
}

export const okAsync = async() => {
    return 'ok';
}

export const noAsync = async() => {
    return 'no';
}