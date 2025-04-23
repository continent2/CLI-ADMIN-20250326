import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import PropTypes from "prop-types";
import {
  ArchiveBoxXMarkIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Avatar, AvatarDot, Badge, Button } from "components/ui";
import { useThemeContext } from "app/contexts/theme/context";
import AlarmIcon from "assets/dualicons/alarm.svg?react";
import GirlEmptyBox from "assets/illustrations/girl-empty-box.svg?react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { formatNumberWithCommas } from "utils/formatNumberWithCommas";
import JWT_HOST_API from 'configs/auth.config'; 

const notificationTypes = {
  all: {
    title: "전체",
    Icon: EnvelopeIcon,
    color: "info",
  },
  deposit: {
    title: "입금",
    Icon: IoCheckmarkDoneOutline,
    color: "success",
  },
  withdraw: {
    title: "출금",
    Icon: DocumentTextIcon,
    color: "neutral",
  },
  alert: {
    title: "경고",
    Icon: ExclamationTriangleIcon,
    color: "error",
  },
};

export function Notifications() {
  const [activeTab, setActiveTab] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["wallet-data"],
    queryFn: async () => {
      const response = await axios.get(
        `${ JWT_HOST_API }/dash/agency`,
//        `https://testne t.cdeposit.online:50825/dash/agency`,
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        },
      );
      return response.data;
    },
  });

  const [depositValue, setDepositValue] = useState(0);
  const [withDrawValue, setWithDrawValue] = useState(0);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "입금 완료",
      description: "", // Will be set in useEffect
      type: "deposit",
    },
    {
      id: 2,
      title: "출금 요청",
      description: "", // Will be set in useEffect
      type: "withdraw",
    },
    {
      id: 3,
      title: "시스템 경고",
      description: "경고",
      type: "alert",
    },
  ]);

  useEffect(() => {
    if (data) {
      const formattedDeposit = formatNumberWithCommas(
        data?.amount_deposit_today_in_quote?.toFixed(2),
      );
      const formattedWithdraw = formatNumberWithCommas(
        data?.amount_withdraw_today_in_quote?.toFixed(2),
      );

      setDepositValue(formattedDeposit);
      setWithDrawValue(formattedWithdraw);

      // Update notifications with the new values
      setNotifications((prev) => [
        {
          ...prev[0],
          description: `${formattedDeposit} 원이 입금되었습니다`,
        },
        {
          ...prev[1],
          description: `${formattedWithdraw} 원 출금이 처리중입니다`,
        },
        prev[2], // Keep the alert notification unchanged
      ]);
    }
  }, [data]); // Removed activeTab from dependencies since it's not used in the effect

  const tabKeys = Object.keys(notificationTypes);

  const filteredNotifications =
    activeTab === 0
      ? notifications
      : notifications.filter(
          (notification) => notification.type === tabKeys[activeTab],
        );

  const removeNotification = (id) => {
    setNotifications((n) => n.filter((n) => n.id !== id));
  };

  const clearNotifications = () => {
    if (activeTab === 0) {
      setNotifications([]);
    } else {
      setNotifications((n) => n.filter((n) => n.type !== tabKeys[activeTab]));
    }
  };

  return (
    <Popover className="relative flex">
      <PopoverButton
        as={Button}
        variant="flat"
        isIcon
        className="relative size-9 rounded-full"
      >
        <AlarmIcon className="size-6 text-gray-900 dark:text-dark-100" />
        {notifications?.length > 0 && (
          <AvatarDot
            color="error"
            isPing
            className="top-0 ltr:right-0 rtl:left-0"
          />
        )}
      </PopoverButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor={{ to: "bottom end", gap: 8 }}
          className="z-[70] mx-4 flex h-[min(32rem,calc(100vh-6rem))] w-[calc(100vw-2rem)] flex-col rounded-lg border border-gray-150 bg-white shadow-soft dark:border-dark-800 dark:bg-dark-700 dark:shadow-soft-dark sm:m-0 sm:w-96"
        >
          {({ close }) => (
            <div className="flex grow flex-col overflow-hidden">
              <div className="flex-grow rounded-t-lg bg-gray-100 dark:bg-dark-800">
                <div className="flex items-center justify-between px-4 pt-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-800 dark:text-dark-100">
                      알림
                    </h3>
                    {notifications?.length > 0 && (
                      <Badge
                        color="primary"
                        className="h-5 rounded-full px-1.5"
                        variant="soft"
                      >
                        {notifications?.length}
                      </Badge>
                    )}
                  </div>
                  <Button
                    component={Link}
                    to="/settings/notifications"
                    className="size-7 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
                    isIcon
                    variant="flat"
                    onClick={close}
                  >
                    <Cog6ToothIcon className="size-4.5" />
                  </Button>
                </div>

                <TabGroup selectedIndex={activeTab} onChange={setActiveTab}>
                  <TabList className="hide-scrollbar flex shrink-0 overflow-x-auto scroll-smooth px-3">
                    {tabKeys.map((key, index) => (
                      <Tab
                        key={key}
                        onFocus={(e) => {
                          e.target.parentNode.scrollLeft =
                            e.target.offsetLeft -
                            e.target.parentNode.offsetWidth / 2;
                        }}
                        className={({ selected }) =>
                          clsx(
                            "shrink-0 scroll-mx-16 whitespace-nowrap border-b-2 px-3 py-2 font-medium",
                            selected
                              ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400"
                              : "border-transparent hover:text-gray-800 focus:text-gray-800 dark:hover:text-dark-100 dark:focus:text-dark-100",
                          )
                        }
                        as={Button}
                        unstyled
                      >
                        {notificationTypes[key].title}
                      </Tab>
                    ))}
                  </TabList>
                  <TabPanels className="flex-1 overflow-y-auto">
                    {tabKeys.map((key, index) => (
                      <TabPanel key={key} className="h-full p-4">
                        {!isLoading && filteredNotifications?.length > 0 ? (
                          <div className="space-y-4">
                            {filteredNotifications.map((item) => (
                              <NotificationItem
                                key={item.id}
                                remove={removeNotification}
                                data={item}
                              />
                            ))}
                          </div>
                        ) : (
                          <Empty />
                        )}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </TabGroup>
              </div>

              {filteredNotifications?.length > 0 && (
                <div className="shrink-0 overflow-hidden rounded-b-lg bg-gray-100 dark:bg-dark-800">
                  <Button
                    className="w-full rounded-t-none"
                    onClick={clearNotifications}
                  >
                    <span>모두 확인</span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

function Empty() {
  const { primaryColorScheme: primary, darkColorScheme: dark } =
    useThemeContext();
  return (
    <div className="grid h-full place-items-center text-center">
      <div className="px-4">
        <GirlEmptyBox
          className="mx-auto w-40"
          style={{ "--primary": primary[500], "--dark": dark[500] }}
        />
        <div className="mt-6">
          <p>새로운 알림이 없습니다</p>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ data, remove }) {
  const typeConfig = notificationTypes[data.type] || notificationTypes.all;
  return (
    <div className="group flex items-center justify-between gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-dark-600">
      <div className="flex min-w-0 gap-3">
        <Avatar
          size={10}
          initialColor={typeConfig.color}
          classNames={{ display: "rounded-lg" }}
        >
          <typeConfig.Icon className="size-4.5" />
        </Avatar>
        <div className="min-w-0">
          <p className="-mt-0.5 truncate font-medium text-gray-800 dark:text-dark-100">
            {data.title}
          </p>
          <div className="mt-0.5 truncate text-sm">{data.description}</div>
          <div className="mt-1 truncate text-xs text-gray-400 dark:text-dark-300">
            {data.time}
          </div>
        </div>
      </div>
      <Button
        variant="flat"
        isIcon
        onClick={() => remove(data.id)}
        className="size-7 rounded-full opacity-0 group-hover:opacity-100"
      >
        <ArchiveBoxXMarkIcon className="size-4" />
      </Button>
    </div>
  );
}

NotificationItem.propTypes = {
  data: PropTypes.object,
  remove: PropTypes.func,
};
