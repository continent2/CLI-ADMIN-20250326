import { HomeIcon } from "@heroicons/react/24/outline";
import { WalletIcon } from "@heroicons/react/24/outline";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowUpOnSquareIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  CloudIcon,
  UserCircleIcon,
  UserIcon,
  LockClosedIcon,
  AcademicCapIcon,
  CubeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_MENU = "";
const path = (root, item) => `${root}${item}`;

export const menu = {
  id: "menu",
  type: NAV_TYPE_ROOT,
  path: "/",
  title: "",
  transKey: "",
  childs: [
    {
      id: "menu.home",
      path: path(ROOT_MENU, "/"),
      type: NAV_TYPE_ITEM,
      title: "Dashboard",
      transKey: "대시보드", //대시보드
      Icon: ChartBarIcon, // HomeIcon,
    },
    {
      id: "menu.deposit",
      path: path(ROOT_MENU, "/deposit"),
      type: NAV_TYPE_ITEM,
      title: "DepositList",
      transKey: "입금 내역",
      Icon: ArrowRightEndOnRectangleIcon, // ArrowLeftEndOnRectangleIcon, //  ArrowDownOnSquareIcon
    },
    {
      id: "menu.member",
      path: path(ROOT_MENU, "/member"),
      type: NAV_TYPE_ITEM,
      title: "MemberList",
      transKey: "회원",
      Icon: UserIcon, // UserCircleIcon,
    },
    {
      id: "menu.site",
      path: path(ROOT_MENU, "/site"),
      type: NAV_TYPE_ITEM,
      title: "",
      transKey: "사이트",
      Icon: BuildingLibraryIcon, // CloudIcon , // LockClosedIcon,
    },
    {
      id: "menu.registerYourSite",
      path: path(ROOT_MENU, "/registerYourSite"),
      type: NAV_TYPE_ITEM,
      title: "",
      transKey: "사이트 등록",
      Icon: BuildingLibraryIcon, //  HomeIcon,
    },
    {
      id: "menu.withdrawalDetail",
      path: path(ROOT_MENU, "/withdrawalDetail"),
      type: NAV_TYPE_ITEM,
      title: "",
      transKey: "출금 내역",
      Icon: ArrowRightStartOnRectangleIcon, //  ArrowUpOnSquareIcon
    },
    {
      id: "menu.withdrawalRequest",
      path: path(ROOT_MENU, "/withdrawalRequest"),
      type: NAV_TYPE_ITEM,
      title: "",
      transKey: "출금 요청",
      Icon: ArrowRightStartOnRectangleIcon,
    },
    {
      id: "menu.siteAdministrator",
      path: path(ROOT_MENU, "/siteAdministrator"),
      type: NAV_TYPE_ITEM,
      title: "",
      transKey: "관리자", // 사이트
      Icon: AcademicCapIcon,
    },
    {
      id: "menu.addSiteAdminstratorForm ",
      path: path(ROOT_MENU, "/addSiteAdminstratorForm"),
      type: NAV_TYPE_ITEM,
      title: "",
      transKey: "관리자 추가", // 사이트
      Icon: AcademicCapIcon, // HomeIcon,
    },
    // {
    //     id: 'menu.adminstratorForm ',
    //     path: path( ROOT_MENU,'/adminstratorForm'),
    //     type: NAV_TYPE_ITEM,
    //     title: '',
    //     transKey: '관리자 양식',
    //     Icon: HomeIcon,
    // },
    {
      id: "menu.setting",
      path: path(ROOT_MENU, "/setting"),
      type: NAV_TYPE_ITEM,
      title: "",
      transKey: "설정", // 세팅
      Icon: Cog6ToothIcon,
    },
  ],
};
