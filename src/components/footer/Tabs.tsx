
import {  BsMap } from "react-icons/bs";
import { RouteObject } from "react-router-dom";
import { ElementType } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import HackathonList from "../hackathonList/HackathonList";
import AddHackathon from "../addHackathon/AddHackathon";
import App from "../../App";

export type HackathonTab = RouteObject & {
    icon?: ElementType,
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
                element: <AddHackathon />,
                title: "add hackathon"
            },
            {
                icon: CiViewList,
                path: "/hackathon/view",
                element: <HackathonList />,
                title: "view hackathon"
            },
            {
                path: "/hackathon/edit/:id",
                element: <AddHackathon updateMode/>,
                title: "Edit Hackathon"
            },
            {
                icon: BsMap,
                path: "/hackathon/map",
                element: < div />,
                title: "hackathon map"
            }
        ]
    }
];