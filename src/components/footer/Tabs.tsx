
import { GiTank } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { HiInformationCircle } from "react-icons/hi";
import { BsAirplaneEnginesFill } from "react-icons/bs";
import { RouteObject } from "react-router-dom";
import { ElementType, ReactNode } from "react";
import App from "../../App";
import { IoAddCircleSharp } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import HackathonList from "../hackathonList/HackathonList";

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
                icon: IoAddCircleSharp,
                path: "/hackathon/add",
                element: <div>d</div>,
                title: "add hackathon"
            },
            {
                icon: CiViewList,
                path: "/hackathon/view",
                element: <HackathonList/>,
                title: "view hackathon"
            },
            {
                icon: BsAirplaneEnginesFill,
                path: "/hackathon/edit",
                element: <div>d</div>,
                title: "edit hackathon"
            }]
    }
];