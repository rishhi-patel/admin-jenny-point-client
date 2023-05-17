import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import GridViewIcon from '@mui/icons-material/GridView';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
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
            title: 'Customers',
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
        },
        {
            id: 'products',
            title: 'Products',
            type: 'item',
            url: '/dashboard/products ',
            icon: ShoppingBagIcon,
            breadcrumbs: false
        }
    ]
};

export default other;
