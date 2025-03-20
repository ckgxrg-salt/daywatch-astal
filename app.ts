import { App } from "astal/gtk3";
import { Variable } from "astal";

import Dashboard from "./widget/dashboard/Dashboard";
import Bar from "./widget/bar/Bar";
import Inhibitor from "./widget/Inhibitor";
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
