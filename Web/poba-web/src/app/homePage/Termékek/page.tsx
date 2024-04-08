import {ItemListFiltering} from "@/app/(Functions)/list_filtering";
import {redirect} from "next/navigation";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";
import {fetch_termekek} from "@/app/(ApiCalls)/fetch";
import {webshopid} from "@/app/(FixData)/variables";
import React from "react";

export default async function TermekekAll({searchParams,}: {
    searchParams: {
        searchParams: string,
        correctList: string
    }
}) {
    const termekek : FItem[] = await fetch_termekek(webshopid.webshopid);
    const query = searchParams.searchParams ?? "";

    return <>
        {ItemListFiltering(searchParams.correctList, termekek, query).map((termek, index) => (
            <tr key={index} onClick={() => {
                redirect(`/Termékek/${termek.id}`)
            }} className={termek.qty === -1 ? "bg-gray-200" : ""}>
                <td>{index + 1}</td>
                <td>{termek.sku}</td>
                <td>{termek.cat_name.map(item => item + ", ")}</td>
                <td>{termek.name}</td>
                <td>{termek.qty === -1 ? "" : termek.qty + " " + termek.unit}</td>
                <td>{termek.price + " Ft"}</td>
                <td className="flex justify-end pe-2">{termek.qty === 0 ?
                    (<img src="/elfogyott_icon.png" width={30} height={30} alt="szallito_ceg_icon"/>)
                    : termek.qty === -1 ? ""
                        : termek.qty <= 10 ?
                            (<img src="/kifogyoban_icon.png" width={30} height={30}
                                    alt="szallito_ceg_icon"/>)
                            : ""}</td>
            </tr>
        ))}
    </>
}