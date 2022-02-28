const verifyPermission = (perm1, perm2) => {
    for (let i = 0; i < perm1.length; i++) {
        for (let j = 0; j < perm2.length; j++) {
            if (perm1[i] === perm2[j]) {
                return true
            }
        }
    }
    return false
}

const routes = [
    {
        path: '/backoffice', permissions: ['ADMIN', 'AMIBA']
    },
    { path: '/backoffice/organizations', permissions: ['ADMIN', 'AMIBA'] },
    { path: '/backoffice/explorations', permissions: ['ADMIN', 'AMIBA',] },
    { path: '/backoffice/explorations/certifications', permissions: ['ADMIN', 'AMIBA',] },
    { path: '/backoffice/users', permissions: ['ADMIN',] },
    // { path: '/backoffice/restaurants', permissions: ['ADMIN',] },
    // { path: '/backoffice/restaurants/menus', permissions: ['ADMIN',] },
    { path: '/backoffice/animals', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR',] },
    { path: '/backoffice/animals/animalProducts', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR',] },
    { path: '/backoffice/eggsBatches', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR',] },
    { path: '/backoffice/eggsBatches/eggsBatchesProducts', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR',] },
    { path: '/backoffice/eggsBatches/eggsBatchesLines', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR',] },
    { path: '/backoffice/orders', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR',] },
    { path: '/backoffice/orders/ordersLines', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR',] },
    { path: '/backoffice/orders/ordersHistory', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR',] },
    { path: '/backoffice/products', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR',] },

    // ### SHOP ###
    { path: '/shop', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR', 'USER'] },
    { path: '/shop/list', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR', 'USER'] },
    { path: '/shop/cart', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR', 'USER'] },
    { path: '/shop/payment', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR', 'USER'] },
    { path: '/shop/payment-success', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR', 'USER'] },

    // ### ACCOUNT ###
    { path: '/account/account-settings', permissions: ['ADMIN', 'AMIBA', 'PRODUCTOR', 'USER',] },

]


export { verifyPermission, routes }