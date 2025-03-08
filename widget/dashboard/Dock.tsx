import { bind, Variable, execAsync } from "astal";
import Tray from "gi://AstalTray";

import { switchFocus } from "../../util/hyprland";

const mem = Variable(0).poll(5000, ["bash", "-c", "printf \"%.0f\\n\" $(free -m | grep Mem | awk '{print ($3 / $2 ) * 100}')"], (out) => parseInt(out));

export default function Dock() {
	return <box
		className="Dock"
	>
		<SysTray />
		<Memory />
	</box>;
}

function SysTray() {
	const tray = Tray.get_default();

	return <box
		className="SysTray"
		heightRequest={75}
		widthRequest={750}
	>
		{bind(tray, "items").as(items => items.map(item => (
			<menubutton
				widthRequest={50}
				tooltipMarkup={bind(item, "tooltipMarkup")}
				usePopover={false}
				actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
				menuModel={bind(item, "menuModel")}>
				<icon gicon={bind(item, "gicon")} />
			</menubutton>
		)))}
	</box>
}

function Memory() {
	return <box
		className="Memory"
		tooltipText="Memory Usage"
		heightRequest={75}
		widthRequest={75}
	>
		<icon icon="drive-virtual" />
		<button
			onClicked={() => {
				switchFocus();
				execAsync("uwsm app -- alacritty -e btop");
			}}
		>
			{mem().as(num => `${num}%`)}
		</button>
	</box >;
}
