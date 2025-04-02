// Import Dependencies
import {RouterProvider} from "react-router";

// Local Imports
import {AuthProvider} from "app/contexts/auth/Provider";
import {DepositProvider} from "./app/contexts/deposit/Provider.jsx";
import {BreakpointProvider} from "app/contexts/breakpoint/Provider";
import {LocaleProvider} from "app/contexts/locale/Provider";
import {SidebarProvider} from "app/contexts/sidebar/Provider";
import {ThemeProvider} from "app/contexts/theme/Provider";
import router from "app/router/router";
import {MemberProvider} from "./app/contexts/member/Provider";
import {SiteProvider} from "./app/contexts/site/Provider.jsx"
import {WithdrawalDetailsProvider} from "./app/contexts/withdrawalDetails/Provider.jsx";
import {AdminUserProvider} from "./app/contexts/adminUser/Provider";

// ----------------------------------------------------------------------

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <DepositProvider>
                    <SiteProvider>
                        <WithdrawalDetailsProvider>
                            <MemberProvider>
                                <AdminUserProvider>
                                    <LocaleProvider>
                                        <BreakpointProvider>
                                            <SidebarProvider>
                                                <RouterProvider router={router}/>
                                            </SidebarProvider>
                                        </BreakpointProvider>
                                    </LocaleProvider>
                                </AdminUserProvider>
                            </MemberProvider>
                        </WithdrawalDetailsProvider>
                    </SiteProvider>
                </DepositProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;