import { App } from "astal/gtk3";
import { Variable } from "astal";

import Dashboard from "./dashboard/Dashboard";
import Bar from "./bar/Bar";
import Inhibitor from "./dashboard/Inhibitor";
import { hyprInit } from "./util/hyprland";
import { mprisInit } from "./util/mpris";

import dashboardCss from "./css/dashboard.scss";
import barCss from "./css/bar.scss";

export const coffeeState = Variable(false);

export const focused = Variable(false);

App.start({
	css: dashboardCss + barCss,
	main() {
		mprisInit();
		hyprInit();
		Inhibitor();
		Bar();
		Dashboard();
	},
});
