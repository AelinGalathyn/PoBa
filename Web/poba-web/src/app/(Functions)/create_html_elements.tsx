import {Button} from "@nextui-org/react";

export function CreateButton(text : string, onClick : () => void ) {

    return <Button key={Math.random() * 0.1} onClick={onClick} className="button-style bg-white">{text}</Button>
}