import FWebshop from "@/app/(DTOs)/Webshopok/FetchWebshop";
import {fetch_webshopok} from "@/app/(ApiCalls)/fetch";
import {Listbox} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/20/solid";
import React from "react";

export default async function Webshopok() {
    const webshopok : FWebshop[] = await fetch_webshopok();

    return (
        <>
            {webshopok && webshopok.map((webshop) => (
                <Listbox.Option key={webshop.webshopid} className={({active}) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-2 text-[#60624d] ${
                        active ? 'bg-white rounded-lg' : ''
                    }`
                }
                    value={webshop}
                >
                    {({selected}) => (
                        <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {webshop.name}
                            </span>
                            {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-4 w-4" aria-hidden="true"/>
                                    </span>
                            ) : null}
                        </>
                    )}
                </Listbox.Option>
            ))}
        </>
    )
}