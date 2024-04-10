import {Item} from "@/app/(DTOs)/Termekek/Termek";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";

let filteredList: FItem[] = [];

export function ItemListFiltering(kategoria: string, originalList: FItem[], keresoKifejezes: string) {

    switch (kategoria) {
        case "Raktárkezelt":
            filteredList = filteredList.filter(item => item.qty !== -1);
            break;
        case "Termék neve szerint":
            filteredList = filteredList.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "Mennyiség szerint":
            filteredList = filteredList.sort((a, b) => a.qty - b.qty);
            break;
        case "Keresőmező" :
            return filteredList.filter(item => item.name.toLowerCase().includes(keresoKifejezes.toLowerCase()))
        case "Csomagtermék" :
            return filteredList.filter(item => item.name.toLowerCase().includes(keresoKifejezes.toLowerCase()))
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
    if (orders && Array.isArray(orders)) {
        return orders.reduce((statistics: { [dayOfWeek: number]: number }, order) => {
            const dayOfWeek = new Date(order.date).getDay();
            statistics[dayOfWeek] = (statistics[dayOfWeek] || 0) + 1;
            return statistics;
        }, {});
    } else {
        return [];
    }
}

export const weeklyIncome = (orders: Orders[]) => {
    if (orders && Array.isArray(orders)) {
        return orders.reduce((statistics: { [dayOfWeek: number]: number }, order) => {
            const dayOfWeek = new Date(order.date).getDay();
            statistics[dayOfWeek] = (order.gross || 0) + order.gross;
            return statistics;
        }, {});
    } else {
        return [];
    }
}

export const sortedListItems = (list: Item[]) => {
    let newList : Item[] = [];
    if (list && Array.isArray(list)) {
        newList = list.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }

    return newList;
}

export const sortedListOrders = (list: Orders[]) => {
    let newList : Orders[] = [];
    if (list && Array.isArray(list)) {
        newList = list.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }

    return newList;
}

export const createDatedItems = (list: FItem[]) => {
    let newList: Item[] = [];
    if (list && Array.isArray(list)) {
        const now = new Date();
        newList = list.filter(item => item.qty >= 0 && item.qty <= 10).map(item => new Item(item, now)).splice(0, 15);
    }
    return newList;
}