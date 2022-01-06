const verifyPermission = (perm1, perm2) => {
    for (let i = 0; i < perm1.length; i++) {
        for (let j = 0; j < perm2.length; j++) {
            if (perm1[i] == perm2[j]) {
                return true
            }
        }
    }
    return false
}


const routes = [
    {
        path: '/dashboard',
        permissions: ['ADMIN', 'PRODUCTOR'],
        title: 'DashBoard',
    },
    {
        path: '/dashboard/organizations',
        permissions: ['ADMIN', 'PRODUCTOR'],
        title: 'Organizações',
    },
    // ORGANIZATIONS
    {
        path: '/backoffice',
        nextRoute: '/backoffice/organizations',
        permissions: ['ADMIN', 'PRODUCTOR'],
        title: 'Organizações',
    },
    {
        path: '/backoffice/organizations',
        permissions: ['ADMIN', 'PRODUCTOR'],
    },
    {
        path: '/backoffice/organizations/create',
        permissions: ['ADMIN'],
    },
    {
        path: '/backoffice/organizations/update',
        permissions: ['ADMIN', 'PRODUCTOR'],
    },

    // EXPLORATIONS
    {
        path: '/backoffice',
        nextRoute: '/backoffice/explorations',
        permissions: ['ADMIN', 'PRODUCTOR'],
        title: 'Explorações',
    },
    {
        path: '/backoffice/explorations',
        permissions: ['ADMIN', 'PRODUCTOR'],
    },
    {
        path: '/backoffice/explorations/create',
        permissions: ['ADMIN'],
    },
    {
        path: '/backoffice/explorations/update',
        permissions: ['ADMIN', 'PRODUCTOR'],
    },

    // EXPLORATION/CERTIFICATIONS
    {
        path: '/backoffice',
        nextRoute: '/backoffice/certifications',
        permissions: ['ADMIN'],
        title: 'Certificações',
    },
    {
        path: '/backoffice/certifications',
        permissions: ['ADMIN'],
    },
    {
        path: '/backoffice/certifications/create',
        permissions: ['ADMIN'],
    },
    {
        path: '/backoffice/certifications/update',
        permissions: ['ADMIN'],
    },

    //USERS
    {
        path: '/backoffice',
        nextRoute: '/backoffice/users',
        permissions: ['ADMIN'],
        title: 'Utilizadores',
    },
    {
        path: '/backoffice/users',
        permissions: ['ADMIN'],
    },
    {
        path: '/backoffice/users/update',
        permissions: ['ADMIN'],
    },

    //RESTAURANTS
    {
        path: '/backoffice',
        nextRoute: '/backoffice/restaurants',
        permissions: ['ADMIN', 'RESTAURANT'],
        title: 'Restaurantes',
    },
    {
        path: '/backoffice/restaurants',
        permissions: ['ADMIN', 'RESTAURANT']
    },
    {
        path: '/backoffice/restaurants/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/restaurants/update',
        permissions: ['ADMIN', 'RESTAURANT']
    },

    //MENUS
    {
        path: '/backoffice',
        nextRoute: '/backoffice/menus',
        permissions: ['ADMIN', 'RESTAURANT'],
        title: 'Menus',
    },
    {
        path: '/backoffice/menus',
        permissions: ['ADMIN', 'RESTAURANT']
    },
    {
        path: '/backoffice/menus/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/menus/update',
        permissions: ['ADMIN', 'RESTAURANT']
    },

    //ANIMALS
    {
        path: '/backoffice',
        nextRoute: '/backoffice/animals',
        permissions: ['ADMIN', 'PRODUCTOR',],
        title: 'Animais',
    },
    {
        path: '/backoffice/animals',
        nextRoute: '/backoffice/animals/list',
        permissions: ['ADMIN',],
        title: 'Listar Animais',
    },
    {
        path: '/backoffice/animals/list',
        permissions: ['ADMIN',]
    },
    {
        path: '/backoffice/animals',
        nextRoute: '/backoffice/animals/create',
        permissions: ['ADMIN', 'AMIBA'], // apenas estes podem
        title: 'Criar Animal',
    },
    {
        path: '/backoffice/animals/create',
        permissions: ['ADMIN', 'AMIBA'], // apenas estes podem
    },
    {
        path: '/backoffice/animals/update',
        permissions: ['ADMIN',]
    },
    {
        path: '/backoffice/animals',
        nextRoute: '/backoffice/animals/animalProducts',
        permissions: ['ADMIN'],
        title: 'Animal/Produto',
    },

    //animals/animalProducts
    {
        path: '/backoffice/animals/animalProducts',
        nextRoute: '/backoffice/animals/animalProducts/list',
        permissions: ['ADMIN'],
        title: 'Listar Animal/Produto',
    },
    {
        path: '/backoffice/animals/animalProducts/list',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/animals/animalProducts',
        nextRoute: '/backoffice/animals/animalProducts/create',
        permissions: ['ADMIN'],
        title: 'Criar Animal/Produto',
    },
    {
        path: '/backoffice/animals/animalProducts/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/animals/animalProducts/update',
        permissions: ['ADMIN']
    },


    // ORDERS
    {
        path: '/backoffice',
        nextRoute: '/backoffice/orders',
        permissions: ['ADMIN'],
        title: 'Encomendas',
    },
    {
        path: '/backoffice/orders',
        nextRoute: '/backoffice/orders/list',
        permissions: ['ADMIN'],
        title: 'Listar Encomendas',
    },
    {
        path: '/backoffice/orders',
        nextRoute: '/backoffice/orders/create',
        permissions: ['ADMIN'],
        title: 'Criar Encomenda',
    },
    {
        path: '/backoffice/orders/list',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/orders/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/orders/update',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/orders',
        nextRoute: '/backoffice/orders/orderLines',
        permissions: ['ADMIN'],
        title: 'Linhas de Encomendas',
    },
    {
        path: '/backoffice/orders',
        nextRoute: '/backoffice/orders/ordersHistory',
        permissions: ['ADMIN'],
        title: 'Estado de Encomendas',
    },
    // ORDERS/ORDERLINES
    {
        path: '/backoffice/orders/orderLines',
        nextRoute: '/backoffice/orders/orderLines/list',
        permissions: ['ADMIN'],
        title: 'Listar Linhas de Encomenda',
    },
    {
        path: '/backoffice/orders/orderLines',
        nextRoute: '/backoffice/orders/orderLines/create',
        permissions: ['ADMIN'],
        title: 'Criar Linha de Encomenda',
    },
    {
        path: '/backoffice/orders/orderLines/list',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/orders/orderLines/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/orders/orderLines/update',
        permissions: ['ADMIN']
    },
    // ORDERS/ORDERHISTORY
    {
        path: '/backoffice/orders/ordersHistory',
        nextRoute: '/backoffice/orders/ordersHistory/list',
        permissions: ['ADMIN'],
        title: 'Listar Estados de Encomendas',
    },
    {
        path: '/backoffice/orders/ordersHistory',
        nextRoute: '/backoffice/orders/ordersHistory/create',
        permissions: ['ADMIN'],
        title: 'Criar Estado de Encomenda',
    },
    {
        path: '/backoffice/orders/ordersHistory/list',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/orders/ordersHistory/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/orders/ordersHistory/update',
        permissions: ['ADMIN']
    },

    // PRODUCTS
    {
        path: '/backoffice',
        nextRoute: '/backoffice/products',
        permissions: ['ADMIN'],
        title: 'Produtos',
    },
    {
        path: '/backoffice/products',
        nextRoute: '/backoffice/products/list',
        permissions: ['ADMIN'],
        title: 'Listar Produtos',
    },
    {
        path: '/backoffice/products',
        nextRoute: '/backoffice/products/create',
        permissions: ['ADMIN'],
        title: 'Criar Produto',
    },
    {
        path: '/backoffice/products/list',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/products/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/products/update',
        permissions: ['ADMIN']
    },
    // eggsbatchs
    {
        path: '/backoffice',
        nextRoute: '/backoffice/eggsBatchs',
        permissions: ['ADMIN', 'PRODUCTOR'],
        title: 'Lotes',
    },
    {
        path: '/backoffice/eggsBatchs',
        nextRoute: '/backoffice/eggsBatchs/list',
        permissions: ['ADMIN'],
        title: 'Listar Lotes',
    },
    {
        path: '/backoffice/eggsBatchs',
        nextRoute: '/backoffice/eggsBatchs/create',
        permissions: ['ADMIN'],
        title: 'Criar Lote',
    },
    {
        path: '/backoffice/eggsBatchs/list',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/eggsBatchs/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/eggsBatchs/update',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/eggsBatchs',
        nextRoute: '/backoffice/eggsBatchs/eggsBatchProducts',
        permissions: ['ADMIN'],
        title: 'Lote/Produto',
    },
    {
        path: '/backoffice/eggsBatchs',
        nextRoute: '/backoffice/eggsBatchs/eggsBatchLines',
        permissions: ['ADMIN'],
        title: 'Linhas de Lote',
    },

    //eggsBatchs/eggsBatchProducts
    {
        path: '/backoffice/eggsBatchs/eggsBatchProducts',
        nextRoute: '/backoffice/eggsBatchs/eggsBatchProducts/list',
        permissions: ['ADMIN'],
        title: 'Listar Lote/Produto',
    },
    {
        path: '/backoffice/eggsBatchs/eggsBatchProducts',
        nextRoute: '/backoffice/eggsBatchs/eggsBatchProducts/create',
        permissions: ['ADMIN'],
        title: 'Criar Lote/Produto',
    },
    {
        path: '/backoffice/eggsBatchs/eggsBatchProducts/list',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/eggsBatchs/eggsBatchProducts/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/eggsBatchs/eggsBatchProducts/update',
        permissions: ['ADMIN']
    },

    //eggsBatchs/eggsBatchLines
    {
        path: '/backoffice/eggsBatchs/eggsBatchLines',
        nextRoute: '/backoffice/eggsBatchs/eggsBatchLines/list',
        permissions: ['ADMIN'],
        title: 'Listar Linhas de Lote',
    },
    {
        path: '/backoffice/eggsBatchs/eggsBatchLines',
        nextRoute: '/backoffice/eggsBatchs/eggsBatchLines/create',
        permissions: ['ADMIN'],
        title: 'Criar Linha de Lote',
    },
    {
        path: '/backoffice/eggsBatchs/eggsBatchLines/list',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/eggsBatchs/eggsBatchLines/create',
        permissions: ['ADMIN']
    },
    {
        path: '/backoffice/eggsBatchs/eggsBatchLines/update',
        permissions: ['ADMIN']
    },



    // =========== SHOP ======================

    {
        path: '/shop',
        permissions: ['ADMIN', 'PRODUCTOR', 'USER']
    },
    {
        path: '/shop/product/[id]',
        permissions: ['ADMIN', 'PRODUCTOR', 'USER']
    },

    // =========== CART ======================

    {
        path: '/cart',
        permissions: ['ADMIN', 'PRODUCTOR', 'USER']
    },

    // =========== ORDERS ======================

    {
        path: '/orders',
        permissions: ['ADMIN', 'PRODUCTOR', 'USER']
    },
    {
        path: '/orders/shippingUpdate',
        permissions: ['ADMIN', 'USER']
    },
    {
        path: '/orders/payments',
        permissions: ['ADMIN', 'USER']
    },
    {
        path: '/orders/details',
        permissions: ['ADMIN', 'USER']
    },
]


export { verifyPermission, routes }