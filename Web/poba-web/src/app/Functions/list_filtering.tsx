import ShowItem from "@/DTOs/Termekek/ShowItem";
import {Item} from "@/DTOs/Termekek/Termek";
import {Orders} from "@/DTOs/Rendelesek/Rendeles";

let filteredList: ShowItem[] = [];

export function ItemListFiltering(kategoria : string, originalList : ShowItem[], keresoKifejezes : string) {

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
        case "Keresőmező" :
            return filteredList.filter(item => item.item.name.toLowerCase().includes(keresoKifejezes.toLowerCase()))
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
    if (orders) {
        return orders.reduce((statistics: {[dayOfWeek: number]: number}, order) => {
            const dayOfWeek = new Date(order.date).getDay();
            statistics[dayOfWeek] = (statistics[dayOfWeek] || 0) + 1;
            return statistics;
        }, {});
    } else {
        return [];
    }
}

export const weeklyIncome = (orders: Orders[]) => {
    if (orders) {
        return orders.reduce((statistics: {[dayOfWeek: number]: number}, order) => {
            const dayOfWeek = new Date(order.date).getDay();
            statistics[dayOfWeek] = (order.gross || 0) + order.gross;
            return statistics;
        }, {});
    } else {
        return [];
    }
}

export const sortedListItems = (list: Item[]) => {
    if (list) {
        return list.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    } else {
        return [];
    }
}

export const sortedListOrders = (list: Orders[]) => {
    if (list) {
        return list.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    } else {
        return [];
    }
}