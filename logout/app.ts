import { App } from "astal/gtk3";

import style from "./style.scss";
import { Logout, LogoutCover } from "./Logout";

// A separate place since we want a command.
App.start({
	css: style,
	instanceName: "logout",
	main() {
		Logout();
		LogoutCover();
	},
});
