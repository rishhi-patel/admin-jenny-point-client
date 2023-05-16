// assets
import { IconUserCircle, IconBriefcase, IconBoxMultiple, IconDashboard } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        // {
        //     id: 'default',
        //     title: 'Dashboard',
        //     type: 'item',
        //     url: '/dashboard/default',
        //     icon: IconDashboard,
        //     breadcrumbs: false
        // },
        {
            id: 'customers',
            title: 'Customer',
            type: 'item',
            url: '/dashboard/customers',
            icon: IconUserCircle,
            breadcrumbs: false
        },
        {
            id: 'category',
            title: 'Categories',
            type: 'item',
            url: '/dashboard/category',
            icon: IconBoxMultiple,
            breadcrumbs: false
        }
        // {
        //     id: 'jobs',
        //     title: 'Jobs',
        //     type: 'item',
        //     url: '/dashboard/jobs ',
        //     icon: IconBriefcase,
        //     breadcrumbs: false
        // }
    ]
};

export default other;
