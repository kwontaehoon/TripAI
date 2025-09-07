export const comma = (data:number, priceFlag) => {
    if(priceFlag){
        return `₩ ${String(data).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }else return `${String(data).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}