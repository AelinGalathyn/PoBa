import ShowItem from "@/DTOs/Termekek/ShowItem";
import ShowRendeles from "@/DTOs/Rendelesek/ShowRendeles";

let filteredList: ShowItem[] = [];

export function ItemListFiltering(kategoria : string, originalList : ShowItem[]) {

    switch (kategoria) {
        case "Raktárkezelt":
            filteredList = originalList.filter(item => item.item.qty !== -1);
            break;
        case "Termék neve szerint":
            filteredList = originalList.sort((a, b) => a.item.name.localeCompare(b.item.name));
            break;
        case "Mennyiség szerint":
            filteredList = originalList.sort((a, b) => a.item.qty - b.item.qty);
            break;
        case "Összes":
            filteredList = originalList;
            break;
        default:
            return originalList;
    }

    return filteredList;
}

export const toggleShowOrder = (id: number) => {
    const showRendelesek : ShowRendeles[] = JSON.parse(localStorage.getItem("showRendelesek")!);

    localStorage.setItem("showRendelesek", JSON.stringify(showRendelesek.map(order =>
        order.order.orderid === id ? { ...order, isShown: !order.isShown } : order
    )))
};