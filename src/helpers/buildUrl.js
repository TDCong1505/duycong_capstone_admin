export const prefix = process.env.REACT_APP_PREFIX ? '/' + process.env.REACT_APP_PREFIX : '';

// const prefix = "";

export const rootPath = {

    signin:prefix + '/signin',
    signup: prefix + "/signup",
    listProduct: prefix + '/product',
    listOrder:prefix + '/order',
    listProductType: prefix + '/producttype',
    listProductLine: prefix + '/productline',
    listPhoto:prefix + '/photo',
    listDes: prefix + '/des',
    listCustomer:prefix + "/customer",
    listOrderDetail: prefix + "/orderdetails",
    listVote: prefix + "/votes",
    listAccount: prefix + "/accounts",
    prefix: '/admin',
    listUser: prefix + "/users",
};
const list = '/list';
export const childPath = {

    listProduct: rootPath.listProduct + list,
    listOrder: rootPath.listOrder + list,
    listProductType: rootPath.listProductType + list,
    listProductLine: rootPath.listProductLine + list,
    listPhoto:rootPath.listPhoto + list,
    listDes: rootPath.listDes + list,
    listCustomer: rootPath.listCustomer + list,
    listOrderBarChart: rootPath.listOrder,
    listOrderDetail: rootPath.listOrderDetail,
    listVote: rootPath.listVote,
    listAccount:rootPath.listAccount + list,
    listUser: rootPath.listUser + list,

};
