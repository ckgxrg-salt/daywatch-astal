import Battery from "gi://AstalBattery";
import { Variable, bind, GLib } from "astal";
import { Gtk } from "astal/gtk3";

export default function Status() {
	return <box
		className="Status"
		vertical
		widthRequest={190}
		heightRequest={140}
	>
		<Clock />
		<Bat />
	</box>;
}

function Clock() {
	const time = Variable<string>("").poll(1000, () =>
		GLib.DateTime.new_now_local().format("%b. %d %H:%M")!);

	return <box
		className="Clock"
		widthRequest={190}
		heightRequest={80}
		onDestroy={() => time.drop()}
		halign={Gtk.Align.CENTER}
		valign={Gtk.Align.CENTER}
	>
		{time()}
	</box>;
}

function Bat() {
	const bat = Battery.get_default();

	return <box
		className="Battery"
		tooltipText="Battery Percentage"
		widthRequest={90}
		heightRequest={90}
	>
		<overlay>
			<circularprogress
				rounded
				value={bind(bat, "percentage")}
				startAt={0.75}
				endAt={0.75}
			>
			</circularprogress>
			<box vertical valign={Gtk.Align.CENTER}>
				<icon
					icon={bind(bat, "batteryIconName")}
				/>
				<label
					label={bind(bat, "percentage").as(p => `${Math.floor(p * 100)} %`)}
				/>
			</box>
		</overlay>
	</box>;
}
