import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import GridViewIcon from '@mui/icons-material/GridView';
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
            icon: GroupIcon,
            breadcrumbs: false
        },
        {
            id: 'category',
            title: 'Categories',
            type: 'item',
            url: '/dashboard/category',
            icon: CategoryIcon,
            breadcrumbs: false
        },
        {
            id: 'brands',
            title: 'Brands',
            type: 'item',
            url: '/dashboard/brands ',
            icon: GridViewIcon,
            breadcrumbs: false
        }
    ]
};

export default other;
