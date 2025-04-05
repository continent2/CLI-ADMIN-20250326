// Import Dependencies
import { Navigate } from "react-router";

// Local Imports
import { AppLayout } from "app/layouts/AppLayout";
import { DynamicLayout } from "app/layouts/DynamicLayout";
import AuthGuard from "middleware/AuthGuard";

// ----------------------------------------------------------------------

const protectedRoutes = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import("app/pages/dashboards/home")).default,
          }),
        },
        {
          path: "/",
          children: [
            {
              index: true,
              element: <Navigate to="/home" />,
            },
            {
              path: "deposit",
              lazy: async () => ({
                Component: (await import("app/pages/deposit/Deposit.jsx")).default,
              }),
            },
            {
              path: "member",
              lazy: async () => ({
                Component: (await import("app/pages/member/Member.jsx")).default,
              }),
            },
            {
              path: "site",
              lazy: async () => ({
                Component: (await import("app/pages/site/Site.jsx")).default,
              }),
            },
            {
              path: "addSiteAdminstratorForm",
              lazy: async () => ({
                Component: (await import("app/pages/adminUser/AdminUserForm.jsx")).default,
              })
            },
            {
              path: "registerYourSite",
              lazy: async () => ({
                Component: (await import("app/pages/site/SiteRegistrationForm.jsx")).default,
              }),
            },
            {
              path: "withdrawalDetail",
              lazy: async () => ({
                Component: (await import("app/pages/withdrawalDetails/WithdrawalDetails.jsx")).default,
              }),
            },
            {
              path: "withdrawalRequest",
              lazy: async () => ({
                Component: (await import("app/pages/withdrawalRequest/WithdrawalRequestForm.jsx")).default,
              }),
            },
            {
              path: "siteAdministrator",
              lazy: async () => ({
                Component: (await import("app/pages/siteAdminstrator/SiteAdminstrator.jsx")).default,
              }),
            },
            {
              path: "adminstratorForm",
              lazy: async () => ({
                Component: (await import("app/pages/adminstratorForm/AdminstratorForm.jsx")).default,
              }),
            },
            // {
            //   path: "registerAsASite",
            //   lazy: async () => ({
            //     Component: (await import("app/pages/Blank.jsx")).default,
            //   }),
            // },
            {
              path: "setting",
              lazy: async () => ({
                Component: (await import("app/pages/setting/SettingForm.jsx")).default,
              }),
            },
          ],
        },
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("app/pages/settings/Layout")).default,
          }),
          children: [
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (await import("app/pages/settings/sections/General"))
                  .default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };
