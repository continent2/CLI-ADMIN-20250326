import { createSafeContext } from "utils/createSafeContext";

export const [SiteContext, useSiteContext] = createSafeContext(
    "useAuthContext must be used within AuthProvider"
);
