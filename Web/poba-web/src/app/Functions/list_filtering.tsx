import ShowItem from "@/DTOs/Termekek/ShowItem";
import {Item} from "@/DTOs/Termekek/Termek";
import {Orders} from "@/DTOs/Rendelesek/Rendeles";

let filteredList: ShowItem[] = [];

export function ItemListFiltering(kategoria : string, originalList : ShowItem[]) {

    switch (kategoria) {
        case "Raktárkezelt":
            filteredList = filteredList.filter(item => item.item.qty !== -1);
            break;
        case "Termék neve szerint":
            filteredList = filteredList.sort((a, b) => a.item.name.localeCompare(b.item.name));
            break;
        case "Mennyiség szerint":
            filteredList = filteredList.sort((a, b) => a.item.qty - b.item.qty);
            break;
        case "Összes":
            filteredList = [...originalList];
            break;
        default:
            filteredList = [...originalList];
            break;
    }

    return filteredList;
}

export const weeklyStatistics = (orders: Orders[]) => {
    return orders.reduce((statistics: {[dayOfWeek: number]: number}, order) => {
        const dayOfWeek = new Date(order.date).getDay();
        statistics[dayOfWeek] = (statistics[dayOfWeek] || 0) + 1;
        return statistics;
    }, {});
}

export const weeklyIncome = (orders: Orders[]) => {
    return orders.reduce((statistics: {[dayOfWeek: number]: number}, order) => {
        const dayOfWeek = new Date(order.date).getDay();
        statistics[dayOfWeek] = (order.gross || 0) + order.gross;
        return statistics;
    }, {});
}

export const sortedListItems = (list: Item[]) => {
    return list.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export const sortedListOrders = (list: Orders[]) => {
    return list.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}