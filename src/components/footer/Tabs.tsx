
import { GiTank } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { HiInformationCircle } from "react-icons/hi";
import { BsAirplaneEnginesFill } from "react-icons/bs";
import { RouteObject } from "react-router-dom";
import { ElementType, ReactNode } from "react";
import App from "../../App";

export type HackathonTab = RouteObject & {
    icon: ElementType,
    title: string
}

export const tabs = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                icon: BsAirplaneEnginesFill,
                path: "/hackathod/add",
                element: <div>d</div>,
                title: "add hackathon"
            },
            {
                icon: BsAirplaneEnginesFill,
                path: "/hackathod/view",
                element: <div>d</div>,
                title: "view hackathon"
            },
            {
                icon: BsAirplaneEnginesFill,
                path: "/hackathod/edit",
                element: <div>d</div>,
                title: "edit hackathon"
            }]
    }
];