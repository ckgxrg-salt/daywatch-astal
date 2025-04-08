import { App, Astal, Gtk } from "astal/gtk3";
import { bind } from "astal";

import { Return, Tea } from "./Buttons";
import Workspaces from "./Workspaces";
import Media from "./Media";
import Sliders from "./Sliders";
import { Clock, Bat } from "./Status";

import { focused } from "../app";

export default function Bar() {
	const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

	return <window
		application={App}
		className="Bar"
		name="astal-bar"
		namespace="astal-bar"
		layer={Astal.Layer.TOP}
		monitor={0}
		exclusivity={Astal.Exclusivity.EXCLUSIVE}
		anchor={TOP | LEFT | BOTTOM}
		visible={bind(focused)}
		widthRequest={50}
	>
		<centerbox vertical className="BarContainer">
			<box vertical className="BarTop" valign={Gtk.Align.START}>
				<Return />
				<Tea />
				<Workspaces />
			</box>
			<box />
			<box vertical className="BarBottom" valign={Gtk.Align.END}>
				<Media />
				<Sliders />
				<Clock />
				<Bat />
			</box>
		</centerbox>
	</window >;
}
