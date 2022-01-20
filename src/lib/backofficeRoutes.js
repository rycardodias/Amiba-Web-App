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
        path: '/backoffice', permissions: ['ADMIN',]
    },
    { path: '/backoffice/organizations', permissions: ['ADMIN',] },
    { path: '/backoffice/explorations', permissions: ['ADMIN',] },
    { path: '/backoffice/explorations/certifications', permissions: ['ADMIN',] },
    { path: '/backoffice/users', permissions: ['ADMIN',] },
    { path: '/backoffice/restaurants', permissions: ['ADMIN',] },
    { path: '/backoffice/restaurants/menus', permissions: ['ADMIN',] },
    { path: '/backoffice/animals', permissions: ['ADMIN',] },
    { path: '/backoffice/animals/animalProducts', permissions: ['ADMIN',] },
    { path: '/backoffice/eggsBatches', permissions: ['ADMIN',] },
    { path: '/backoffice/eggsBatches/EggsBatchesProducts', permissions: ['ADMIN',] },
    { path: '/backoffice/eggsBatches/eggsBatchesLines', permissions: ['ADMIN',] },
    { path: '/backoffice/orders', permissions: ['ADMIN',] },
    { path: '/backoffice/orders/ordersLines', permissions: ['ADMIN',] },
    { path: '/backoffice/orders/ordersHistory', permissions: ['ADMIN',] },
    { path: '/backoffice/products', permissions: ['ADMIN',] },

    // ### SHOP ###
    { path: '/shop', permissions: ['ADMIN', 'USER'] },
    { path: '/shop/list', permissions: ['ADMIN', 'USER'] },
    { path: '/shop/cart', permissions: ['ADMIN', 'USER'] },
    { path: '/shop/payment', permissions: ['ADMIN', 'USER'] },


    // ### ACCOUNT ###
    { path: '/account/account-settings', permissions: ['ADMIN', 'USER',] },

]


export { verifyPermission, routes }