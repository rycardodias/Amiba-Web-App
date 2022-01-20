import { routes, verifyPermission } from "./backofficeRoutes"

const checkURLPermission = (url, permission) => {
    let permissionValid = false

    routes.filter(u => u.path === url)
        .map((value) => {
            if (verifyPermission(permission, value.permissions)) {
                permissionValid = true
            }
        })

    return permissionValid
}

export default checkURLPermission