export const CONFIGURATION = {
    page: {
        limit: 8
    },
    environment: {
        development: "development",
        production: "production"
    },
    prefixDomain: {
        main: "admin-api",
        auth: "auth",
        mainDev: "admin-api",
        mainApi: "main-api"
    },
    gender: [
        {
            id: 0,
            title: "Khác"
        },
        {
            id: 1,
            title: "Nam"
        },
        {
            id: 2,
            title: "Nữ"
        }
    ],
    fnewStatus: [
        {
            id: 1,
            title: "Đang chờ duyệt"
        },
        {
            id: 2,
            title: "Đang hiển thị"
        },
        {
            id: 4,
            title: "Hết hạn"
        },
        {
            id: 8,
            title: "Đã xóa"
        }
    ],
    status: [
        {
            id: 1,
            title: "Tin nháp"
        },
        {
            id: 2,
            title: "Đang chờ duyệt"
        },
        {
            id: 3,
            title: "Đang hiển thị"
        },
        {
            id: 4,
            title: "Hết hạn"

        },
        {
            id: 5,
            title: "Tin đã đóng"
        },
        {
            id: 6,
            title: "Tin bị xóa"
        },
        {
            id: 7,
            title: "Tin bị từ chối"
        }
    ],
    jobStatus: [
        {
            id: 1,
            title: "Tin nháp"
        },
        {
            id: 2,
            title: "Chưa duyệt"
        },
        {
            id: 3,
            title: "Đã đăng"
        },
        {
            id: 4,
            title: "Hết hạn"

        },
        {
            id: 5,
            title: "Đã hoàn thành"
        },
        {
            id: 6,
            title: "Đã hóa"
        },
        {
            id: 7,
            title: "Bị từ chối"
        }
    ],
    wage: [
        {
            id: 0,
            title: 'Thỏa thuận',
        },
    ],
    zetaJob: [
        {
            id: 1,
            title: "Phải"
        },
        {
            id: 2,
            title: "Không phải"
        }
    ],
    urgent: [
        {
            id: 1,
            title: "Có"
        },
        {
            id: 0,
            title: "Không"
        }
    ],
    statusUserIdentification: [
        {
            id: 0,
            title: "Chờ duyệt"
        },
        {
            id: 1,
            title: "Đã duyệt"
        },
        {
            id: 2,
            title: "Từ chối"
        }
    ],
    identificationType: [
        {
            id: 1,
            title: "CMND"
        }
    ],
    role: [
        {
            id: "SUPER_ADMIN",
            title: "SUPER_ADMIN"
        },
        {
            id: "ADMIN",
            title: "ADMIN"
        },
        {
            id: "MANAGER",
            title: "MANAGER"
        },
        {
            id: "JOB_MANAGER",
            title: "JOB_MANAGER"
        },
        {
            id: "BUSINESS",
            title: "BUSINESS"
        },
        {
            id: "CONTENT_MANAGER",
            title: "CONTENT_MANAGER"
        }
    ],
    warningDay: [
        {
            id: 0,
            title: "Quá 3 ngày"
        },
        {
            id: 1,
            title: "Quá 7 ngày"
        },
        {
            id: 2,
            title: "Quá 30 ngày"
        }
    ],
    statusUser: [
        {
            id: 0,
            title: "Chưa kích hoạt"
        },
        {
            id: 1,
            title: "Kích hoạt"
        },
        {
            id: 2,
            title: "Bị khóa"
        },
        {
            id: 3,
            title: "Bị xóa"
        }
    ],
    censorship: [
        {
            id: 1,
            title: "Chưa duyệt"
        },
        {
            id: 2,
            title: "Đã duyệt"
        },
        {
            id: 3,
            title: "Không hợp lệ"
        }
    ],
    isEmployEE: [
        {
            id: 0,
            title: "Không"
        },
        {
            id: 1,
            title: "Có"
        }
    ],
    isEmployER: [
        {
            id: 0,
            title: "Không"
        },
        {
            id: 1,
            title: "Có"
        }
    ],
    isPersonal: [
        {
            id: 0,
            title: "Không"
        },
        {
            id: 1,
            title: "Có"
        }
    ],
    fjobNewCategoryId: [
        {
            id: 1,
            title: "ER"
        },
        {
            id: 2,
            title: "EE"
        }
    ],
    typeSetting: [
        {
            id: "string",
            title: "string"
        },
        {
            id: "int",
            title: "int"
        },
        {
            id: "json",
            title: "json"
        }
    ],
    statusMailSupport: [
        {
            id: 0,
            title: "Chưa xem"
        },
        {
            id: 1,
            title: "Đã xem"
        }
    ],
    verifyKyc: [
        {
            id: 0,
            title: "Chưa xác thực"
        },
        {
            id: 1,
            title: "Đã xác thực"
        }
    ],
    isOutstanding: [
        {
            id: 0,
            title: "Không phải"
        },
        {
            id: 1,
            title: "Phải"
        }
    ],
    userRole: [
        {
            id: 1,
            title: "SUPER_ADMIN"
        },
        {
            id: 2,
            title: "ADMIN"
        },
        {
            id: 3,
            title: "MANAGER"
        },
        {
            id: 4,
            title: "JOB_MANAGER"
        },
        {
            id: 5,
            title: "BUSINESS"
        },
        {
            id: 6,
            title: "CONTENT_MANAGER"
        }
    ],
    bannerType: [
        {
            id: 1,
            title: "Banner EE Mid 1"
        },
        {
            id: 2,
            title: "Banner EE Mid 2"
        },
        {
            id: 3,
            title: "Banner EE Top 1"
        },
        {
            id: 4,
            title: "Banner ER Bot 1"
        },
    ],
    statusBanner: [
        {
            id: 1,
            title: "Đang chờ duyệt"
        },
        {
            id: 2,
            title: "Đang hiển thị"
        },
        {
            id: 4,
            title: "Quá hạn"
        },
        {
            id: 8,
            title: "Đã xóa"
        },
    ],
    typeBanner: [
        {
            id: 1,
            descWeb: {
                address: "Banner phía dưới Box việc làm siêu hot",
                size: "440*245",
                mechanism: "9"
            },
            imgWeb: "https://storage.googleapis.com/fjob-dev/06-2022/b0ffbe70-e89e-11ec-b0db-8322901c0eb3.png",
            descApp: {
                address: "Banner phía dưới Box việc làm phù hợp",
                size: "",
                mechanism: "9"
            },                      
            imgApp: "https://storage.googleapis.com/fjob-dev/06-2022/ec56a1a0-e89e-11ec-b0db-8322901c0eb3.png",
        },
        {
            id: 2,
            descWeb: {
                address: "Banner phía dưới Box việc làm siêu gấp",
                size: "1380*150",
                mechanism: "5"
            },
            imgWeb: "https://storage.googleapis.com/fjob-dev/06-2022/d89716e0-e89e-11ec-b0db-8322901c0eb3.png",
            descApp: {
                address: "Banner phía dưới Box việc làm mới nhất",
                size: "343*120",
                mechanism: "5" 
            },               
            imgApp: "https://storage.googleapis.com/fjob-dev/06-2022/1b8444a0-e89f-11ec-b0db-8322901c0eb3.png",
        },
        {
            id: 3,
            descWeb: {
                address: "Banner trên đầu trang chủ Ứng viên",
                size: "1920*800",
                mechanism: "5"                
            },
            imgWeb: "https://storage.googleapis.com/fjob-dev/06-2022/3210ab00-e89f-11ec-b0db-8322901c0eb3.png",
            descApp: {
                address: "Banner trên đầu trang chủ Ứng viên",
                size: "",
                mechanism: "5"
            },                      
            imgApp: "https://storage.googleapis.com/fjob-dev/06-2022/3de821b0-e89f-11ec-b0db-8322901c0eb3.png",
        },
        {
            id: 4,
            descWeb: {
                address: "Banner phía dưới Box thông tin Job trang chủ Nhà tuyển dụng",
                size: "440*245",
                mechanism: "9"
            },
            imgWeb: "https://storage.googleapis.com/fjob-dev/06-2022/4c32e250-e89f-11ec-b0db-8322901c0eb3.png",
            descApp: {
                address: "Banner phía dưới Box thông tin Job trang chủ Nhà tuyển dụng",
                size: "",
                mechanism: "9"
            },                     
            imgApp: "https://storage.googleapis.com/fjob-dev/06-2022/590c86c0-e89f-11ec-b0db-8322901c0eb3.png",
        },
    ],
    transactionType: [
        {
            id: 1,
            title: "Khách hàng mua"
        },
        {
            id: 2,
            title: "Tặng khách hàng"
        },
        {
            id: 3,
            title: "Nạp tài khoản Fjob"
        }
    ],
};

export const convertStatus = status => {
    let statusItem = "";
    switch (status) {
        case 1:
            statusItem = "Tin nháp";
            break;
        case 2:
            statusItem = 'Đang chờ duyệt';
            break;
        case 3:
            statusItem = "Đang hiển thị";
            break;
        case 4:
            statusItem = "Hết hạn";
            break;
        case 5:
            statusItem = "Tin đã đóng";
            break;
        case 6:
            statusItem = "Tin bị xoá";
            break;
        case 7:
            statusItem = 'Tin bị từ chối';
            break;
        default:
            break;
    }
    return statusItem;
};

export const convertStatusUser = status => {
    let statusItem = "";
    switch (status) {
        case 0:
            statusItem = "Chưa kích hoạt";
            break;
        case 1:
            statusItem = "Kích hoạt";
            break;
        case 2:
            statusItem = "Bị khóa";
            break;
        case 3:
            statusItem = "Bị xóa";
            break;
        default:
            break;
    }
    return statusItem;
};

export const convertCensorshipUser = status => {
    let statusItem = "";
    switch (status) {
        case 1:
            statusItem = "Chưa duyệt";
            break;
        case 2:
            statusItem = "Đã duyệt";
            break;
        case 3:
            statusItem = "Không hợp lệ";
            break;
        default:
            break;
    }
    return statusItem;
};

export const convertUrgent = urgent => {
    let urgentItem = "";
    switch (urgent) {
        case 0:
            urgentItem = "✖️";
            break;
        case 1:
            urgentItem = "✔️";
            break;
        default:
            break;
    }
    return urgentItem;
};

export const convertZetaJob = zetaJob => {
    let zetaJobItem = "";
    switch (zetaJob) {
        case 1:
            zetaJobItem = "Phải";
            break;
        case 2:
            zetaJobItem = "Không phải";
            break;
        default:
            break;
    }
    return zetaJobItem;
};

export const convertJobType = jobType => {
    let jobTypeItem = "";
    switch (jobType) {
        case 0:
            jobTypeItem = "Tất cả";
            break;
        case 1:
            jobTypeItem = "Ngắn hạn";
            break;
        case 2:
            jobTypeItem = "Dài hạn";
            break;
        default:
            break;
    }
    return jobTypeItem;
};

export const convertIntToTime = int => {
    const Int = Math.floor(int);
    const decimal = (int - Int) / 100 * 60;
    const intItem = Math.round((Int + decimal) * 100) / 100;

    return intItem;
};

export const convertGender = gender => {
    let genderItem = [];
    if (!gender) {
        return "Khác";
    } else {
        if (Array.isArray(gender)) {
            gender.map(item => {
                switch (item) {
                    case 0:
                        genderItem.push("Khác");
                        break;
                    case 1:
                        genderItem.push("Nam");
                        break;
                    case 2:
                        genderItem.push("Nữ");
                        break;
                    default:
                        break;
                }
            });
        } else {
            switch (gender) {
                case 0:
                    genderItem.push("Khác");
                    break;
                case 1:
                    genderItem.push("Nam");
                    break;
                case 2:
                    genderItem.push("Nữ");
                    break;
                default:
                    break;
            }
        }
    }

    return genderItem.toString();
};

export const convertEducationLevel = educationLevel => {
    let educationLevelItem = "";
    switch (educationLevel) {
        case 0:
            educationLevelItem = "Không yêu cầu";
            break;
        case 1:
            educationLevelItem = "Chưa tốt nghiệp THPT";
            break;
        case 2:
            educationLevelItem = "Tốt nghiệp THPT";
            break;
        case 3:
            educationLevelItem = "Tốt nghiệp trung cấp";
            break;
        case 4:
            educationLevelItem = "Tốt nghiệp cao đẳng";
            break;
        case 5:
            educationLevelItem = "Tốt nghiệp đại học";
            break;
        case 6:
            educationLevelItem = "Trên đại học";
            break;
        default:
            break;
    }
    return educationLevelItem;
};

export const convertPrice = int => {
    var nf = new Intl.NumberFormat();

    return nf.format(int);
};

export const convertStatusUserIdentification = int => {
    let status = "";
    switch (int) {
        case 0:
            status = "Chờ duyệt";
            break;
        case 1:
            status = "Đã duyệt";
            break;
        case 2:
            status = "Từ chối";
            break;
        default:
            break;
    }
    return status;
};

export const convertIdentificationType = int => {
    let status = "";
    switch (int) {
        case 0:
            status = "Không xác định";
            break;
        case 1:
            status = "CMND";
            break;
        default:
            break;
    }
    return status;
};

export const convertWarningDay = int => {
    let status = "";
    switch (int) {
        case 0:
            status = "Quá 3 ngày";
            break;
        case 1:
            status = "Quá 7 ngày";
            break;
        case 2:
            status = "Quá 30 ngày";
            break;
        default:
            break;
    }
    return status;
};

export const convertEmployee = item => {
    let itemValue = "";
    switch (item) {
        case 0:
            itemValue = "✖️";
            break;
        case 1:
            itemValue = "✔️";
            break;
        default:
            break;
    }
    return itemValue;
};

export const convertEmployer = item => {
    let itemValue = "";
    switch (item) {
        case 0:
            itemValue = "✖️";
            break;
        case 1:
            itemValue = "✔️";
            break;
        default:
            break;
    }
    return itemValue;
};

export const convertPriceUnit = item => {
    let itemValue = "";
    switch (item) {
        case 1:
            itemValue = "Ngày";
            break;
        case 2:
            itemValue = "Tuần";
            break;
        case 4:
            itemValue = "Tháng";
            break;
        default:
            break;
    }
    return itemValue;
};

export const convertRoleCompany = item => {
    let itemValue = "";
    switch (item) {
        case 0:
            itemValue = "Đang chờ duyệt";
            break;
        case 1:
            itemValue = "Người quản lý";
            break;
        default:
            break;
    }
    return itemValue;
};

export const convertTypeNewCategory = item => {
    let itemValue = "";
    switch (item) {
        case 1:
            itemValue = "ER";
            break;
        case 2:
            itemValue = "EE";
            break;
        default:
            break;
    }
    return itemValue;
};

export const convertIsPublic = item => {
    let itemValue = "";
    switch (item) {
        case 0:
            itemValue = "No";
            break;
        case 1:
            itemValue = "Yes";
            break;
        default:
            break;
    }
    return itemValue;
};

export const convertStatusMailSupport = item => {
    let itemValue = "";
    switch (item) {
        case 0:
            itemValue = "Chưa xem";
            break;
        case 1:
            itemValue = "Đã xem";
            break;
        default:
            break;
    }
    return itemValue;
};


export const convertBirthday = item => {
    const date = new Date(item);
    const itemValue = date.toLocaleDateString();
    return itemValue;
};

export const convertStatusBanner = status => {
    let statusItem = "";
    switch (status) {
        case 1:
            statusItem = "Đang chờ duyệt";
            break;
        case 2:
            statusItem = "Đang hiển thị";
            break;
        case 4:
            statusItem = "Quá hạn";
            break;
        case 8:
            statusItem = "Đã xóa";
            break;
        default:
            break;
    }
    return statusItem;
};
export const convertBannerType = status => {
    let statusItem = "";
    switch (status) {
        case 1:
            statusItem = "Banner EE Mid 1";
            break;
        case 2:
            statusItem = "Banner EE Mid 2";
            break;
        case 3:
            statusItem = "Banner EE Top 1";
            break;
        case 4:
            statusItem = "Banner ER Bot 1";
            break;
        default:
            break;
    }
    return statusItem;
};

const constantCensorship = {
    approved: {
        key: 1,
        name: "Đã duyệt"
    },
    notApproved: {
        key: 2,
        name: "Chưa duyệt"
    },
    illegal: {
        key: 3,
        name: "Không hợp lệ"
    }
}

const constantBanUser = {
    active: {
        key: 1,
        name: "Hoạt động"
    },
    block: {
        key: 2,
        name: "Đã khoá"
    }
}


export const convertCensorship = num => {
    return Object.values(constantCensorship).find(item => item.key === num)?.name
}

export const convertBanUser = num => {
    return Object.values(constantBanUser).find(item => item.key === num)?.name
}

export const convertTransactionType = (item) => {
    let itemValue = "";
    switch (item) {
        case 1:
            itemValue = "Khách hàng mua";
            break;
        case 2:
            itemValue = "Tặng khách hàng";
            break;
        case 3:
            itemValue = "Nạp tài khoản Fjob";
            break;
        default:
            break;
    }
    return itemValue;
}

// export const convertTimestampToDateTime = (timestamp) => {
//     const date = new Date(timestamp)
//     const value = date.getFullYear() + "=" + date.getMonth + "-" + date.getDay + "T" +
    
// }

export const convertTimestampToDate = (timestamp) => {
    const ts = new Date(timestamp * 1000)
    return ts.toLocaleString()
}

export const convertToHumanDate = (timestamp) => {
    const fullTime = new Date(timestamp * 1000)
    const year = fullTime.getFullYear()
    const month = `0${fullTime.getMonth() + 1}`.slice(-2)
    const date = `0${fullTime.getDate()}`.slice(-2)
    return `${date}/${month}/${year}`
}

export function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}

export const convertDatetoDate = (date) => {
    let dd = (new Date(date)).getDate()
    let mm = (new Date(date)).getMonth() + 1
    const yyyy = (new Date(date)).getFullYear()
    if (dd < 10) {
        dd = "0" + dd
    }
    if (mm < 10) {
        mm = "0" + mm
    }
    return yyyy + "-" + mm + "-" + dd
}
export const convertDatetoDateDMY = (date) => {
    let dd = (new Date(date)).getDate()
    let mm = (new Date(date)).getMonth() + 1
    const yyyy = (new Date(date)).getFullYear()
    if (dd < 10) {
        dd = "0" + dd
    }
    if (mm < 10) {
        mm = "0" + mm
    }
    return dd + "-" + mm + "-" + yyyy
}
export const convertTimeToHHmm = date => {
    const arrNum = date.toString().split('.')
    return `${String(arrNum[0]).padStart(2, '0')}:${String(
        (Number(arrNum[1]) * 0.6).toFixed(),
    ).padStart(2, '0')}`
}