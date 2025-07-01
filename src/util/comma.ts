export const comma = (data:string) => {
    return `₩${String(data).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}