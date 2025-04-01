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

// ----------------------------------------------------------------------

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <DepositProvider>
                    <LocaleProvider>
                        <BreakpointProvider>
                            <SidebarProvider>
                                <RouterProvider router={router}/>
                            </SidebarProvider>
                        </BreakpointProvider>
                    </LocaleProvider>
                </DepositProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;