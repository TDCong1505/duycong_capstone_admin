import { CONFIGURATION } from 'Configuration';
import jwtDecode from 'jwt-decode';
export const formatDiamond = value => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0');

export const formatNumber = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getAccessTokenCookieCSR = () => {
  return localStorage.getItem('token');
};

export const getTokenUser = () => {
  let token;
  try {
    const encodedAccessToken = getAccessTokenCookieCSR();
    if (encodedAccessToken) {
      token = encodedAccessToken;
    }
  } catch (e) {
    return null;
  }
  return token;
};

export const removeVietnameseTones = str => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  str = str.replace(/\u02C6|\u0306|\u031B/g, '');

  str = str.replace(/ + /g, ' ');
  str = str.trim();
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|-|{|}|\||\\/g, '');
  str = str.split(' ').join('-');
  return str.toLowerCase();
};

export const matchYoutubeUrl = (url) => {
  const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if(url.match(p)){
      return url.match(p)[1];
  }
  return false;
}

export const getEmbedLinkYoutube = (youtubeLink) => {
  const tempArraySearch =  youtubeLink?.split("?");
  const urlSearchParams = new URLSearchParams(`?${tempArraySearch[1]}`);
  const params = Object.fromEntries(urlSearchParams.entries())
  console.log("ahihi",params);
  return `https://www.youtube.com/embed/${params.v}`
}

// export const getQueryString = () => {
//   // if (typeof window !== 'undefined') {
//   const urlSearchParams = new URLSearchParams(window.location.search)
//   const params = Object.fromEntries(urlSearchParams.entries())
//   return params
//   // }
//   // return
// }

const toStandard = (phone) => {
  if ((phone.length === 10 || phone.length === 11) && phone[0] === "0") {
    return `84${phone}`.replace(/840/g, "84");
  }
  let p = phone;
  if (p[0] === "0") {
    p = p.replace(/084/g, "84");
  }

  if (p[2] === "0") {
    p = p.replace(/840/g, "84");
  }
  return p;
}

export const checkPhoneNumber = (str) => {
  const phone = str.replace(/[^0-9]/g, "");

  // Check mobile phone
  const isPhone = /^($|(084|84|))(0?[3|5|7|8|9])([0-9]{8})\b/g.test(phone)

  // Check home phone
  const isHomePhone = /^($|(084|84|))(0?2)([0-9]{9})\b/g.test(phone)

  if (isPhone || isHomePhone) {
    return toStandard(phone)
  }

  return null
}
export const calcTranslateX = (width, tab) => {
  if (!width) {
    return tab * 560;
  }
  if (width >= 1200) {
    return tab * 560;
  }
  return tab * (width * 560 / 1200)
}

export const calcWidthTranslateX = (width) => {
  if (!width) {
    return 560;
  }
  if (width >= 1200) {
    return 560;
  }

  return width * 560 / 1200
}

export const getHeaderToken = () => {
  const decoded = jwtDecode(getTokenUser()) || {};

  return {
    'x-fjob-user-id': decoded.uid,
    'x-fjob-role': 'user',
    'x-fjob-user-code': decoded.userCode,

    'Content-Type': 'application/json',
    Authorization: `Bearer ${getTokenUser()}`
  }
}

export function createCategories(categories = [], parentId = 0) {
  const categoryList = []
  let category

  if (parentId === 0) {
    category = categories.filter(cat => cat.parentId === 0)
  } else {
    category = categories.filter(cat => cat.parentId === parentId)
  }

  category.forEach((cate) => {
    if (parentId === 0)
      categoryList.push({
        value: cate.id,
        label: cate.name,
        children: createCategories(categories, cate.id),
      })
    else
      categoryList.push({
        value: cate.id,
        label: cate.name,
      })
  })

  return categoryList
}
// Xóa dấu các tất cả các từ tiếng việt
export function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}
export const filterSelectOption = (input, option) =>
  removeAccents(option?.children?.toLowerCase()).indexOf(removeAccents(input.toLowerCase())) >= 0

export const filterSortSelectOption = (optionA, optionB) => {
  if (optionA.children && optionB.children)
    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
}
