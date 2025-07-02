export const comma = (data:number) => {
    return `₩${String(data).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}