import {
    Mail,
    Home,
    Circle,
    Database,
    Users,
    User,
    CreditCard,
    Box,
    Briefcase,
    Grid,
    BookOpen,
    Book, BarChart2, BarChart, Settings
} from 'react-feather'

export default [
    {
        id: 'home',
        title: 'Home',
        icon: <Home size={20}/>,
        navLink: '/home',
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Grid size={20}/>,
        navLink: '/dashboard',
    },
    {
        id: 'master',
        title: 'Master Data',
        icon: <Database size={20}/>,
        children: [
            {
                id: 'product',
                title: 'Produk',
                icon: <Circle size={20}/>,
                navLink: '/products'
            },
            {
                id: 'category',
                title: 'Kategori',
                icon: <Circle size={20}/>,
                navLink: '/categories'
            },
            {
                id: 'brand',
                title: 'Merk',
                icon: <Circle size={20}/>,
                navLink: '/brands'
            },
            {
                id: 'unit',
                title: 'Satuan',
                icon: <Circle size={20}/>,
                navLink: '/units'
            },
            {
                id: 'warhouse',
                title: 'Gudang',
                icon: <Circle size={20}/>,
                navLink: '/warehouses'
            },
            {
                id: 'employee',
                title: 'Karyawan',
                icon: <Circle size={20}/>,
                navLink: '/employees'
            },
            {
                id: 'customer',
                title: 'Customer',
                icon: <Circle size={20}/>,
                navLink: '/customers'
            },
            {
                id: 'supplier',
                title: 'Supplier',
                icon: <Circle size={20}/>,
                navLink: '/suppliers'
            },
        ]
    },
    {
        id: 'sale',
        title: 'Penjualan',
        icon: <BarChart2 size={20}/>,
        children: [
            {
                id: 'saleOrder',
                title: 'Pesanan Penjualan',
                icon: <Circle size={12}/>,
                navLink: '/sale-orders'
            },
            {
                id: 'sale',
                title: 'Penjualan',
                icon: <Circle size={12}/>,
                navLink: '/sales'
            },
            {
                id: 'saleReturn',
                title: 'Retur Penjualan',
                icon: <Circle size={12}/>,
                navLink: '/sale-returns'
            },
            {
                id: 'saleRevision',
                title: 'Revisi Penjualan',
                icon: <Circle size={12}/>,
                navLink: '/sale-revisions'
            }
        ]
    },
    {
        id: 'purchase',
        title: 'Pembelian',
        icon: <BarChart size={20}/>,
        children: [
            {
                id: 'purchaseOrder',
                title: 'Pesanan Pembelian',
                icon: <Circle size={12}/>,
                navLink: '/purchase-orders'
            },
            {
                id: 'purchase',
                title: 'Pembelian',
                icon: <Circle size={12}/>,
                navLink: '/purchases'
            },
            {
                id: 'purchaseReturn',
                title: 'Retur Pembelian',
                icon: <Circle size={12}/>,
                navLink: '/purchase-returns'
            },
            {
                id: 'purchaseRevision',
                title: 'Revisi Pembelian',
                icon: <Circle size={12}/>,
                navLink: '/purchase-revisions'
            }
        ]
    },
    {
        id: 'inventory',
        title: 'Inventory',
        icon: <Box size={20}/>,
        children: [
            {
                id: 'inventoryWarehouse',
                title: 'Gudang',
                icon: <Circle size={12}/>,
                navLink: '/inventories/warehouses'
            }
        ]
    },
    {
        id: 'logistic',
        title: 'Logistik',
        icon: <Box size={20}/>,
        children: [
            {
                id: 'stockAdjustment',
                title: 'Penyesuaian Stok',
                icon: <Circle size={12}/>,
                navLink: '/stock-adjustments'
            }
        ]
    },
    {
        id: 'accounting',
        title: 'Akuntansi',
        icon: <BookOpen size={20}/>,
        children: [
            {
                id: 'coa',
                title: 'COA',
                icon: <Circle size={12}/>,
                navLink: '/chart-of-account'
            },
            {
                id: 'journal',
                title: 'Jurnal',
                icon: <Circle size={20}/>,
                navLink: '/journals'
            },
            {
                id: 'generalLedger',
                title: 'Buku Besar',
                icon: <Circle size={12}/>,
                navLink: '/general-ledgers'
            },
            {
                id: 'balanceSheet',
                title: 'Neraca',
                icon: <Circle size={12}/>,
                navLink: '/balance-sheets'
            },
            {
                id: 'financialStatement',
                title: 'Laporan Keuangan',
                icon: <Circle size={12}/>,
                navLink: '/financial-statements'
            },
        ]
    },
    {
        id: 'receivable',
        title: 'Piutang',
        icon: <CreditCard size={20}/>,
        navLink: '/receivables'
    },
    {
        id: 'payable',
        title: 'Hutang',
        icon: <CreditCard size={20}/>,
        navLink: '/payables'
    },
    {
        id: 'user',
        title: "User",
        icon: <User size={20}/>,
        children: [
            {
                id: 'user',
                title: "User",
                icon: <Circle size={20}/>,
                navLink: '/users'
            },
            {
                id: 'role',
                title: "Role",
                icon: <Circle size={20}/>,
                navLink: '/roles'
            },
            {
                id: 'permission',
                title: "Permission",
                icon: <Circle size={20}/>,
                navLink: '/permissions'
            },

        ]
    },
    {
        id: 'report',
        title: "Laporan",
        icon: <Book size={20}/>,
        children: [
            {
                id: 'retailSale',
                title: "Penjualan Ritel",
                icon: <Circle size={20}/>,
                navLink: '/reports/retail-sales'
            },
            {
                id: 'wholesaleSale',
                title: "Penjualan Grosir",
                icon: <Circle size={20}/>,
                navLink: '/reports/wholesale-sales'
            },
            {
                id: 'productStock',
                title: "Laporan Stok Produk",
                icon: <Circle size={20}/>,
                navLink: '/reports/setting-product-stocks'
            },
            {
                id: 'stockMutation',
                title: "Laporan Mutasi Stok",
                icon: <Circle size={20}/>,
                navLink: '/reports/stock-mutations'
            },
        ]
    },
    {
        id: "setting",
        title: "Pengaturan",
        icon: <Settings size={20}/>,
        children: [
            {
                id: 'settingProduct',
                title: "Pengaturan Produk",
                icon: <Circle size={20}/>,
                navLink: '/settings/products'
            },
            {
                id: 'settingCoa',
                title: "Pengaturan Akun",
                icon: <Circle size={20}/>,
                navLink: '/settings/coas'
            },
            {
                id: 'settingCompany',
                title: "Pengaturan Perusahaan",
                icon: <Circle size={20}/>,
                navLink: '/settings/companies'
            },
        ]
    }
]
