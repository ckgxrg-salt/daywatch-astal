import Battery from "gi://AstalBattery";
import { Variable, bind, GLib } from "astal";
import { Gtk } from "astal/gtk3";

export function Clock() {
	const time = Variable<string>("").poll(1000, () =>
		GLib.DateTime.new_now_local().format("%H:%M")!);

	return <box
		className="Barlock"
		onDestroy={() => time.drop()}
		halign={Gtk.Align.CENTER}
		valign={Gtk.Align.CENTER}
	>
		{time()}
	</box>;
}

export function Bat() {
	const bat = Battery.get_default();

	return <box className="Bartery" tooltipText="Battery Percentage">
		<circularprogress
			value={bind(bat, "percentage")}
			startAt={0.75}
			endAt={0.75}
		>
			<icon />
		</circularprogress>
		<label
			label={bind(bat, "percentage").as(p => `${Math.floor(p * 100)} %`)}
		/>
	</box>;
}
