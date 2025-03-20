import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { bind } from "astal";

import Buttons from "./Buttons";
import Dock from "./Dock";
import Media from "./Media";
import MediaServices from "./MediaServices";
import Quote from "./Quote";
import Sliders from "./Sliders";
import Status from "./Status";
import Workspaces from "./Workspaces";

import { switchFocus } from "../../util/hyprland";
import { focused } from "../../app";

export default function Dashboard() {
	return <window
		application={App}
		className="Dashboard"
		name="astal-dashboard"
		namespace="astal-dashboard"
		layer={Astal.Layer.BOTTOM}
		monitor={1}
		exclusivity={Astal.Exclusivity.EXCLUSIVE}
		visible={bind(focused).as(v => !v)}
		widthRequest={1540}
		heightRequest={420}
		// Send cursor back to primary screen
		setup={self => {
			self.connect("touch-event", (_, event) => {
				if (event.get_event_type() === Gdk.EventType.TOUCH_END) {
					switchFocus();
				}
			})
		}}
	>
		<box
			className="DashboardContainer"
			halign={Gtk.Align.CENTER}
			valign={Gtk.Align.CENTER}
		>
			<Buttons />
			<box vertical>
				<Workspaces />
				<Quote />
				<Dock />
			</box>
			<box vertical>
				<Media />
				<MediaServices />
			</box>
			<box vertical>
				<Sliders />
				<Status />
			</box>
		</box>
	</window >;
}
