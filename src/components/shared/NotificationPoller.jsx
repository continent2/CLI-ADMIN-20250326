import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useThemeContext } from "app/contexts/theme/context";

const NotificationPoller = () => {
  const { themeMode } = useThemeContext();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(
          "https://testnet.cdeposit.online:50825/query/list/plain/notify/status/1/id/DESC/0/15",
          {
            headers: {
              Authorization: localStorage.getItem("authToken"),
            },
          },
        );
        const notifications = data?.list || [];

        notifications.forEach((item) =>
          toast.info(item.message || "🔔 You have a new notification!", {
            position: "top-right",
            autoClose: 15000,
            theme: themeMode === "light" ? "light" : "dark",
          }),
        );
      } catch (error) {
        console.error("Notification fetch error:", error);
      }
    };

    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [themeMode]);

  return null; // No visible UI
};

export default NotificationPoller;
