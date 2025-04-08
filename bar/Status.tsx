import Battery from "gi://AstalBattery";
import { Variable, bind, GLib } from "astal";
import { Gtk } from "astal/gtk3";

export function Clock() {
	const time = Variable<string>("").poll(1000, () =>
		GLib.DateTime.new_now_local().format("%H\n%M")!);

	return <box
		vertical
		className="Barlock"
		onDestroy={() => time.drop()}
		widthRequest={40}
	>
		<label label={time()} halign={Gtk.Align.CENTER} />
	</box>;
}

function mapBatState(warn: Battery.WarningLevel, state: Battery.State) {
	if (warn == Battery.WarningLevel.LOW) return "ProgLow";
	if (warn == Battery.WarningLevel.CRITICIAL) return "ProgCrit";
	if (state == Battery.State.CHARGING) return "ProgCharging";
	if (state == Battery.State.FULLY_CHARGED) return "ProgCharging";
	return "Prog";
}
export function Bat() {
	const bat = Battery.get_default();
	const className = Variable.derive([bind(bat, "warningLevel"), bind(bat, "state")], (w, s) => mapBatState(w, s));

	return <box
		vertical
		className="Bartery"
		tooltipText="Battery Percentage"
	>
		<circularprogress
			className={className()}
			value={bind(bat, "percentage")}
			startAt={0.75}
			endAt={0.75}
		>
			<icon />
		</circularprogress>
		<label
			label={bind(bat, "percentage").as(p => `${Math.floor(p * 100)}`)}
		/>
	</box>;
}
