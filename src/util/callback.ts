export const timer = (callback: (message: string) => void) => {
    setTimeout(() => {
        callback('success');
    }, 3000);
}