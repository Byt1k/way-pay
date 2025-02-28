import * as Icons from 'tabler-icons-react';
import HkBadge from '@/components/@hk-badge/@hk-badge';
import {nanoid} from 'nanoid';

export const DashboardMenu = [

    //Apps group
    {
        id: nanoid(),
        title: 'Калькулятор',
        icon: <Icons.Calculator/>,
        link: '/apps/calculator',
    },
    {
        id: nanoid(),
        title: 'Чат',
        icon: <Icons.MessageDots/>,
        link: '/apps/chat/chats',

    },
    {
        id: nanoid(),
        title: 'Календарь',
        icon: <Icons.CalendarTime/>,
        link: '/apps/calendar',
    },
    {
        id: nanoid(),
        title: 'Todo',
        icon: <Icons.ListDetails/>,
        badge: <HkBadge bg="success" soft>2</HkBadge>,
        link: '/apps/todo/task-list',
    },
    {
        id: nanoid(),
        title: 'Блог',
        icon: <Icons.Browser/>,
        link: '/apps/blog/posts',

    },

];