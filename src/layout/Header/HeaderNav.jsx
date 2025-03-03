import React from 'react';
import Link from 'next/link';
import {DashboardMenu} from './MenuList';
import {usePathname} from 'next/navigation';
import {useGlobalStateContext} from '@/context/GolobalStateProvider';

const HeaderNav = () => {

    const {dispatch} = useGlobalStateContext();
    const pathname = usePathname();


    return (
        <>

            {DashboardMenu.map((menu, index) => (
                    <React.Fragment key={index}>
                        {/*<Card bsPrefix="nav-item" className={pathname === menu.link ? 'active' : ''}>*/}
                        <Link href={menu.link} target={menu?.target}
                              className={`header-nav-link ${pathname === menu.link ? 'active' : ''}`}>
                            <span className="header-nav-icon-wrap">
                                                                <span className="svg-icon">
                                                                    {menu.icon}
                                                                </span>
                            </span>
                            <span className="header-nav-link-text">{menu.title}</span>
                            {menu.badge && menu.badge}
                        </Link>
                        {/*</Card>*/}
                    </React.Fragment>
                )
            )}
            <div onClick={() => dispatch({type: 'sidebar_toggle'})} className="hk-menu-backdrop"/>
        </>
    )
}


export default HeaderNav;