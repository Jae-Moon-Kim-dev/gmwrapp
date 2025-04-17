export const adminMenuInfo = [
    {
        id: 1,
        name: '메뉴 관리',
        url: '',
        active: true,
        children: [
            {
                id: 2,
                name: '메뉴 관리',
                url: '/admin/menu',
                active: true,
                children: null,
            },
            {
                id: 3,
                name: '메뉴 권한 관리',
                url: '/admin/menuPermission',
                active: false,
                children: null,
            },
        ],
    },
    {
        id: 4,
        name: '회원 관리',
        url: '',
        active: false,
        children: [
            {
                id: 5,
                name: '회원 관리',
                url: '/admin/member',
                active: false,
                children: null,
            },
            {
                id: 6,
                name: '회원 구분/등급',
                url: '/admin/role',
                active: false,
                children: null,
            },
        ],
    },
];