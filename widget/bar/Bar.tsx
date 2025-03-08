import { App, Astal, Gtk } from "astal/gtk3";
import { bind } from "astal";

import { Return, Tea } from "./Buttons";
import Workspaces from "./Workspaces";
import Media from "./Media";
import Sliders from "./Sliders";
import { Clock, Bat } from "./Status";

import { focused } from "../../app";

export default function Bar(monitor: number) {
	const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

	return <window
		application={App}
		className="Bar"
		name="astal-bar"
		namespace="astal-bar"
		layer={Astal.Layer.TOP}
		monitor={monitor}
		exclusivity={Astal.Exclusivity.EXCLUSIVE}
		anchor={TOP | LEFT | RIGHT}
		visible={bind(focused)}
	>
		<centerbox className="BarContainer">
			<box className="BarLeft" halign={Gtk.Align.START}>
				<Return />
				<Tea />
				<Workspaces />
			</box>
			<box />
			<box className="BarRight" halign={Gtk.Align.END}>
				<Media />
				<Sliders />
				<Clock />
				<Bat />
			</box>
		</centerbox>
	</window >;
}
