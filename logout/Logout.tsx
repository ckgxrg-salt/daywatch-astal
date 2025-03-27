import { App, Astal, Gdk } from "astal/gtk3";
import Buttons from "./Buttons";

const { TOP, LEFT, BOTTOM, RIGHT } = Astal.WindowAnchor;

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
			if (event.get_keyval()[1] === Gdk.KEY_Escape) {
				App.quit();
			}
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
			if (event.get_keyval()[1] === Gdk.KEY_Escape) {
				App.quit();
			}
		}}
	/>;
}
