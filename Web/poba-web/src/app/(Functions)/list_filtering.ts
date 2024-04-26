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
            return filteredList.filter(item => item.packaged)
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
    let statistics: Record<string, number> = {
        "Hétfő": 0,
        "Kedd": 0,
        "Szerda": 0,
        "Csütörtök": 0,
        "Péntek": 0,
        "Szombat": 0,
        "Vasárnap": 0
    };

    if (orders && Array.isArray(orders)) {
        orders.forEach(order => {
            let dayOfWeek = weekSwitchCase(new Date(order.date).getDay());
            statistics[dayOfWeek] = (statistics[dayOfWeek] || 0) + 1;
        });
    }
    return statistics;
}


export const weeklyIncome = (orders: Orders[]) => {
    let statistics: Record<string, number> = {
        "Hétfő": 0,
        "Kedd": 0,
        "Szerda": 0,
        "Csütörtök": 0,
        "Péntek": 0,
        "Szombat": 0,
        "Vasárnap": 0
    };
    if (orders && Array.isArray(orders)) {
        orders.forEach(order => {
            let dayOfWeek = weekSwitchCase(new Date(order.date).getDay());
            statistics[dayOfWeek] += Number(order.gross > 1000 ? order.gross / 10000 : order.gross);
        });
    }
    return statistics;
}

export const weeklyFamousItems = (orders: Orders[]) => {
    let statistics: Record<string, number> = {};
    if (orders && Array.isArray(orders)) {
        orders.forEach(order => {
            order.items.forEach(item => {
                if (item.sku !== "shipping-cost") {
                    const sku = item.sku;
                    const quantity = item.quantity || 0;
                    statistics[sku] = (statistics[sku] || 0) + quantity;
                }
            })
        });
    }

    const sortedStats: Record<string, number> = Object.fromEntries(
        Object.entries(statistics).sort((a, b) => b[1] - a[1])
    );

    return Object.fromEntries(Object.entries(sortedStats).splice(0, 10))
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

const weekSwitchCase = (index : number) => {
    let dayOfWeek = "";
    switch (index) {
        case 1 :
            dayOfWeek = "Hétfő"
            break;
        case 2 :
            dayOfWeek = "Kedd"
            break;
        case 3 :
            dayOfWeek = "Szerda"
            break;
        case 4 :
            dayOfWeek = "Csütörtök"
            break;
        case 5 :
            dayOfWeek = "Péntek"
            break;
        case 6 :
            dayOfWeek = "Szombat"
            break;
        case 7 :
            dayOfWeek = "Vasárnap"
            break;
    }

    return dayOfWeek;
}

export const getRandomRgbColor = (): string => {
    const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const green = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const blue = Math.floor(Math.random() * 256); // Random value between 0 and 255

    return `rgb(${red}, ${green}, ${blue})`;
}

export const feltoltFogyoTermekek = (newTermekek : FItem[], oldFogyoTermekek : Item[]) => {
    if (newTermekek && Array.isArray(newTermekek)) {
        newTermekek.forEach(item => {
            const existingItemIndex = oldFogyoTermekek.findIndex(termek => termek.fItem.id === item.id);
            if (existingItemIndex === -1 && item.qty <= 10 && item.qty >= 0) {
                oldFogyoTermekek.push(new Item(item, new Date()));
            } else if (existingItemIndex !== -1 && item.qty !== oldFogyoTermekek[existingItemIndex].fItem.qty) {
                oldFogyoTermekek[existingItemIndex] = new Item(item, new Date());
            }
        });
    }

    return oldFogyoTermekek;
}
