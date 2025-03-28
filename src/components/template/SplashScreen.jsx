// Local Imports
import appLogo from "assets/appIcon.png"
import {Progress} from "components/ui";

// ----------------------------------------------------------------------

export function SplashScreen() {
    return (
        <div className="fixed grid h-full w-full place-content-center">
            <img src={appLogo} alt="app_logo" className="size-28 rounded-[50%]"/>
            <Progress
                color="primary"
                isIndeterminate
                animationDuration="1s"
                className="mt-2 h-1"
            />
        </div>
    );
}
