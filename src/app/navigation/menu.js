import { HomeIcon } from '@heroicons/react/24/outline';
import { WalletIcon } from "@heroicons/react/24/outline";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from 'constants/app.constant'

const ROOT_MENU = ''
const path = (root, item) => `${root}${item}`;

export const menu = {
    id: 'menu',
    type: NAV_TYPE_ROOT,
    path: '/',
    title: '',
    transKey: '',
    childs: [
        {
            id: 'menu.home',
            path: path(ROOT_MENU,'/'),
            type: NAV_TYPE_ITEM,
            title: 'Dashboard',
            transKey: '대시보드 (대시보드)',
            Icon: HomeIcon,
        },
        {
            id: 'menu.deposit',
            path: path( ROOT_MENU,'/deposit'),
            type: NAV_TYPE_ITEM,
            title: 'Deposit',
            transKey: '입금 (입금)',
            Icon: WalletIcon,
        },
        {
            id: 'menu.member',
            path: path( ROOT_MENU,'/member'),
            type: NAV_TYPE_ITEM,
            title: '',
            transKey: '회원 (회원)',
            Icon: HomeIcon,
        },
        {
            id: 'menu.site',
            path: path( ROOT_MENU,'/site'),
            type: NAV_TYPE_ITEM,
            title: '',
            transKey: '사이트 (사이트)',
            Icon: HomeIcon,
        },
        {
            id: 'menu.registerYourSite',
            path: path( ROOT_MENU,'/registerYourSite'),
            type: NAV_TYPE_ITEM,
            title: '',
            transKey: '사이트를 등록하세요. (사이트를 등록하십시오.)',
            Icon: HomeIcon,
        },
        {
            id: 'menu.withdrawalDetail',
            path: path(ROOT_MENU,'/withdrawalDetail'),
            type: NAV_TYPE_ITEM,
            title: '',
            transKey: '출금 내역 (출금 상세 정보)',
            Icon: HomeIcon,
        },
        {
            id: 'menu.withdrawalRequest',
            path: path( ROOT_MENU,'/withdrawalRequest'),
            type: NAV_TYPE_ITEM,
            title: '',
            transKey: '출금 요청 (출금 신청)',
            Icon: HomeIcon,
        },
        {
            id: 'menu.withdrawalRequest',
            path: path( ROOT_MENU,'/withdrawalReq'),
            type: NAV_TYPE_ITEM,
            title: '',
            transKey: '출금 요청 (출금 신청)',
            Icon: HomeIcon,
        },
        {
            id: 'menu.siteAdministrator',
            path: path( ROOT_MENU,'/siteAdministrator'),
            type: NAV_TYPE_ITEM,
            title: '',
            transKey: '사이트 관리자 (사이트 어드민)',
            Icon: HomeIcon,
        },
        // {
        //     id: 'menu.registerAsASite ',
        //     path: path( ROOT_MENU,'/registerAsASite'),
        //     type: NAV_TYPE_ITEM,
        //     title: '',
        //     transKey: '사이트로 등록하세요. (사이트로 등록하십시오.)',
        //     Icon: HomeIcon,
        // },
        {
            id: 'menu.adminstratorForm ',
            path: path( ROOT_MENU,'/adminstratorForm'),
            type: NAV_TYPE_ITEM,
            title: '',
            transKey: '관리자 양식',
            Icon: HomeIcon,
        },
        {
            id: 'menu.setting',
            path: path(ROOT_MENU,'/setting'),
            type: NAV_TYPE_ITEM,
            title: '',
            transKey: '설정 (설정)',
            Icon: HomeIcon,
        },
    ]
}

