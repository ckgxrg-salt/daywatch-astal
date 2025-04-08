import { App, Astal, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import Buttons from "./Buttons";
import { confirm } from "./Buttons";

const { TOP, LEFT, BOTTOM, RIGHT } = Astal.WindowAnchor;
const hypr = Hyprland.get_default();

// Holds buttons
export function Logout() {
	return <window
		application={App}
		className="Logout"
		name="astal-logout"
		namespace="astal-logout"
		layer={Astal.Layer.TOP}
		monitor={1}
		anchor={TOP | LEFT | BOTTOM | RIGHT}
		keymode={Astal.Keymode.EXCLUSIVE}
		onKeyPressEvent={(_, event) => {
			handleKeybind(event.get_keyval()[1]);
		}}
	>
		<Buttons />
	</window>;
}

// Just for blurring the primary monitor
export function LogoutCover() {
	return <window
		application={App}
		className="LogoutCover"
		name="astal-logout-cover"
		namespace="astal-logout-cover"
		layer={Astal.Layer.TOP}
		monitor={0}
		anchor={TOP | LEFT | BOTTOM | RIGHT}
		keymode={Astal.Keymode.EXCLUSIVE}
		onKeyPressEvent={(_, event) => {
			handleKeybind(event.get_keyval()[1]);
		}}
	/>;
}

function handleKeybind(keycode: number) {
	switch (keycode) {
		case Gdk.KEY_Escape: App.quit();
		case Gdk.KEY_s: {
			if (confirm.get() === "shutdown") {
				hypr.dispatch("exec", "systemctl poweroff");
				App.quit();
			}
			confirm.set("shutdown");
			break;
		}
		case Gdk.KEY_r: {
			if (confirm.get() === "reboot") {
				hypr.dispatch("exec", "systemctl reboot");
				App.quit();
			}
			confirm.set("reboot");
			break;
		}
		case Gdk.KEY_l: {
			if (confirm.get() === "lock") {
				hypr.dispatch("exec", "bash -c 'pidof hyprlock || hyprlock --immediate'");
				App.quit();
			}
			confirm.set("lock");
			break;
		}
		case Gdk.KEY_e: {
			if (confirm.get() === "lgout") {
				hypr.dispatch("exec", "uwsm stop");
				App.quit();
			}
			confirm.set("lgout");
			break;
		}
		case Gdk.KEY_p: {
			if (confirm.get() === "suspend") {
				hypr.dispatch("exec", "systemctl suspend");
				App.quit();
			}
			confirm.set("suspend");
			break;
		}
	}
}
