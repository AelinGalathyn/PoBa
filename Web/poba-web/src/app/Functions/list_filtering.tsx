import ShowItem from "@/DTOs/Termekek/ShowItem";
import ShowRendeles from "@/DTOs/Rendelesek/ShowRendeles";
import {FItem} from "@/DTOs/Termekek/FTermek";

export function ItemListFiltering(list : ShowItem[], kategoria : string, originalList : ShowItem[]) {

    let filteredList = list;

    switch (kategoria) {
        case "Raktárkezelt":
            filteredList = filteredList.filter(item => item.item.qty !== -1);
            break;
        case "Termék neve szerint":
            filteredList = filteredList.sort((a, b) => {
                if (a.item.name < b.item.name) return -1;
                if (a.item.name > b.item.name) return 1;
                return 0;
            });
            break;
        case "Mennyiség szerint":
            filteredList = filteredList.sort((a, b) => { return a.item.qty - b.item.qty });
            break;
        case "Összes" :
            filteredList = [...originalList];
            break;
        default :
            return list;
    }

    return filteredList;
}

export const toggleShowOrder = (id: number) => {
    const showRendelesek : ShowRendeles[] = JSON.parse(localStorage.getItem("showRendelesek")!);

    localStorage.setItem("showRendelesek", JSON.stringify(showRendelesek.map(order =>
        order.order.orderid === id ? { ...order, isShown: !order.isShown } : order
    )))
};