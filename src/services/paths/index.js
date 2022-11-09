export const servicePaths = {
  
  //product
  getAllProduct:'/products',
  productDetail:'/products/productCode/',
  createProduct: '/products/productLineId/',
  updateProduct: '/products/productCode/',
  getProductPageable: '/products/pageable/',
  getProductByProductLineCode: '/products/productLineCode/',

  //product line
  getAllProductLine:'/productlines',
  getProductLinePageable:'/productlines/pageable/',
  getByProductLineCode: '/productlines/productlineCode/',
  createProductLine:'/productlines/productTypeId/',
  updateProductLine: '/productlines/productLineCode/',

  //product description
  getDesByProductCode:'/productdescriptions/productCode/',
  updateProductDes:'/productdescriptions/',
  createProductDes:'/productdescriptions/productCode/',
  getProductDesPageable: '/productdescriptions/pageable/',
  getDesById: '/productdescriptions/',

  //product photo
  getPhotoByProductCode:'/productphotos/productCode/',
  getProductPhotoPageable: '/productphotos/pageable/',
  createProductPhoto: '/productphotos/productCode/',
  getProductPhotoById: '/productphotos/',
  updatePhoto: 'productphotos/',
  deletePhotoById: '/productphotos/',

  //product type
  getAllProductType:'/producttypes',
  getProductTypePageable: '/producttypes/pageable/',
  createProductType:'/producttypes',
  getProductTypeDetail: '/producttypes/productTypeCode/',
  updateProductType:'/producttypes/productTypeCode/',
  deleteProductType: '/producttypes/productTypeCode/',

  //customer
  getAll: '/customers',
  getAllPageable: '/customers/pageable/',
  getCustomerById: '/customers/',
  updateCustomer:'/customers/',
  createCustomer: '/customers',
  getCustomerByOrderId: '/customers/orderId/',

  //orders
  getAllOrderPageable: '/orders/pageable/',
  createOder: '/orders/customerId/',
  getOrderById: '/orders/',
  updateOrder: '/orders/',
  getAllOrder: '/orders',
  getOrderByCustomerId: '/orders/customerId/',
  getByTime: '/orders/rangeTime/',
  orderExportExcel : '/orders/export/excel', 

  //orderdetails 
  createOrderDetail: '/orderdetails/productCode/',
  getByOrderId: '/orderdetails/orderId/',
  getOrderDetailPageable: '/orderdetails/pageable/',
  getOrderDetailById: '/orderdetails/',


  //vote
  getVoteByProductCode:'/votes/productCode/',
  getVotePageable: '/votes/pageable/',
  
  //account 
  getAccountPageable: '/users/pageable/',
  
  //roles 
  getAllRoles : '/roles',

  //users 
  getUserById: '/users/',

  //employee
  updateEmployee: '/employees/',

  //user
  userLogin: '/login',
  updateUser: '/users/',
  getUserByUsername: '/users/username/',

};

