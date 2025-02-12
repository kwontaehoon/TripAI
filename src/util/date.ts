export const after3days = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
}