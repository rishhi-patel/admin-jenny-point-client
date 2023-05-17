import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const Customer = Loadable(lazy(() => import('views/customers/CustomerMain')));
const CandidateDetails = Loadable(lazy(() => import('views/customerDetails/CustomerDetailsMain')));
const Jobs = Loadable(lazy(() => import('views/jobs/JobsMain')));
const JobDetailsMain = Loadable(lazy(() => import('views/jobDetails/JobDetailsMain')));
const AddJobMain = Loadable(lazy(() => import('views/jobDetails/AddJobMain')));
const Categories = Loadable(lazy(() => import('views/category/CategoriesMain')));
const CategoryDetailsMain = Loadable(lazy(() => import('views/categoryDetails/CategoryDetailsMain')));
const BrandMain = Loadable(lazy(() => import('views/brand/BrandMain')));
// const customerDetails = Loadable(lazy(() => import()));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                },
                {
                    path: 'customers',
                    element: <Customer />
                },
                {
                    path: 'customers/:id',
                    element: <CandidateDetails />
                },
                {
                    path: 'jobs',
                    element: <Jobs />
                },
                {
                    path: 'jobs/:id',
                    element: <JobDetailsMain />
                },
                {
                    path: 'jobs/new',
                    element: <AddJobMain />
                },
                {
                    path: 'category',
                    element: <Categories />
                },
                {
                    path: 'category/:id',
                    element: <CategoryDetailsMain />
                },
                {
                    path: 'brands',
                    element: <BrandMain />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        }
    ]
};

export default MainRoutes;
