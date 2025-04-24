import { useEffect, useCallback, useMemo, useRef } from "react";
import axios from "axios";
import { useThemeContext } from "app/contexts/theme/context";
import { toast } from "sonner";
// import JWT_HOST_API from 'configs/auth.config'; 
import { JWT_HOST_API }  from 'configs/auth.config'; 

const NotificationPoller = () => {
  const { themeMode } = useThemeContext();
  const shownIds = useRef(new Set());

  // Memoize toast config to prevent recreating on every render
  const toastConfig = useMemo(
    () => ({
      position: "top-right",
      autoClose: 15000,
      theme: themeMode === "light" ? "light" : "dark",
      style: {
        background: themeMode === "light" ? "#ffffff" : "#1e293b",
        color: themeMode === "light" ? "#1e293b" : "#f8fafc",
        border:
          themeMode === "light" ? "1px solid #e2e8f0" : "1px solid #334155",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "16px 24px",
        fontSize: "14px",
        fontWeight: "500",
      },
      iconTheme: {
        primary: themeMode === "light" ? "#3b82f6" : "#60a5fa",
        secondary: themeMode === "light" ? "#f8fafc" : "#1e293b",
      },
      closeButton: {
        style: {
          color: themeMode === "light" ? "#64748b" : "#94a3b8",
        },
        ariaLabel: "Close notification",
      },
      progressStyle: {
        background:
          themeMode === "light"
            ? "linear-gradient(to right, #3b82f6, #60a5fa)"
            : "linear-gradient(to right, #60a5fa, #93c5fd)",
        height: "3px",
        borderRadius: "12px",
      },
    }),
    [themeMode],
  );

  // Get notification duration from localStorage only once
  const notificationDuration = useMemo(() => {
    const duration = localStorage.getItem("notification-duration");
    return duration ? +duration : 30000; // Default to 30 seconds
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const { data } = await axios.get( `${ JWT_HOST_API }/query/list/plain/notify/status/1/id/DESC/0/15`,
//        "https://testnet.cd eposit.online:50825/query/list/plain/notify/status/1/id/DESC/0/15",
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        },
      );

      (data?.list || []).forEach((item) => {
        if (!shownIds.current.has(item.id)) {
          toast.info(
            item.message || "🔔 You have a new notification!",
            toastConfig,
          );
          shownIds.current.add(item.id);
        }
      });
    } catch (error) {
      console.error("Notification fetch error:", error);
    }
  }, [toastConfig]);

  useEffect(() => {
    fetchNotifications(); // Initial fetch

    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return null;
};

export default NotificationPoller;
