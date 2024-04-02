import ShowItem from "@/DTOs/Termekek/ShowItem";
import ShowRendeles from "@/DTOs/Rendelesek/ShowRendeles";

export function ItemListFiltering(list : ShowItem[], kategoria : string) {

    switch (kategoria) {
        case "Raktárkezelt" :
            return list.filter(item => item.item.qty !== -1);
        case "Termék neve szerint" :
            return list.filter(item => item).sort((a, b) => {
                if (a.item.name < b.item.name) return -1;
                if (a.item.name > b.item.name) return 1;
                return 0;
            });
        case "Mennyiség szerint" :
            return list.filter(item => item).sort((a, b) => {return a.item.qty - b.item.qty})
        case "Összes" :
            return list;
        default :
            return list;
    }

}

export const toggleShowOrder = (id: number) => {
    const showRendelesek : ShowRendeles[] = JSON.parse(localStorage.getItem("showRendelesek")!);

    localStorage.setItem("showRendelesek", JSON.stringify(showRendelesek.map(order =>
        order.order.orderid === id ? { ...order, isShown: !order.isShown } : order
    )))
};