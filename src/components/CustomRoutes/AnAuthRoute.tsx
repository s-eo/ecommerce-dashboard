import {useCallback} from "react";
import { Outlet } from 'react-router-dom';

import TopBar from "../Layout/TopBar.tsx";



export default function AnAuthRoute() {
    const toggleSidebar = useCallback(() => {}, []);

    return (
        <>
            <TopBar onMenuClick={toggleSidebar} withLogo={true}/>
            <Outlet/>
        </>
    )
}
