import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';

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
const ProductsMain = Loadable(lazy(() => import('views/product/ProductsMain')));
const ProductDetails = Loadable(lazy(() => import('views/productDetails/ProductDetailsMain')));
const CreateNewProduct = Loadable(lazy(() => import('views/productDetails/CreateNewProduct')));
const DistributorMain = Loadable(lazy(() => import('views/distributor/DistributorMain')));
const DistributorDetailsMain = Loadable(lazy(() => import('views/distributorDetails/DistributorDetailsMain')));
const AddDistributor = Loadable(lazy(() => import('views/distributorDetails/AddDistributor')));
const OrdersMain = Loadable(lazy(() => import('views/orders/OrdersMain')));
const OrderDetails = Loadable(lazy(() => import('views/orderDetails/OrderDetails')));
const OffersMain = Loadable(lazy(() => import('views/offers/OffersMain')));
const AddOffer = Loadable(lazy(() => import('views/offers/AddOffer')));
const OfferDetailsMain = Loadable(lazy(() => import('views/offers/OfferDetailsMain')));

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
                },
                {
                    path: 'products',
                    element: <ProductsMain />
                },
                {
                    path: 'products/new',
                    element: <CreateNewProduct />
                },
                {
                    path: 'products/:id',
                    element: <ProductDetails />
                },
                {
                    path: 'distributors',
                    element: <DistributorMain />
                },
                {
                    path: 'distributors/new',
                    element: <AddDistributor />
                },
                {
                    path: 'distributors/:id',
                    element: <DistributorDetailsMain />
                },
                { path: 'orders', element: <OrdersMain /> },
                { path: 'orders/:id', element: <OrderDetails /> },
                { path: 'offers', element: <OffersMain /> },
                { path: 'offers/new', element: <AddOffer /> },
                { path: 'offers/:id', element: <OfferDetailsMain /> }
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
