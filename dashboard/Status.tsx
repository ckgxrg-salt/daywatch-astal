import Battery from "gi://AstalBattery";
import { Variable, bind, GLib } from "astal";
import { Gtk } from "astal/gtk3";

export default function Status() {
	return <box
		vertical
		widthRequest={230}
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
		widthRequest={230}
		heightRequest={80}
		onDestroy={() => time.drop()}
	>
		<label label={time()} />
	</box>;
}

function mapBatState(warn: Battery.WarningLevel, state: Battery.State) {
	if (warn == Battery.WarningLevel.LOW) return "ProgLow";
	if (warn == Battery.WarningLevel.CRITICIAL) return "ProgCrit";
	if (state == Battery.State.CHARGING) return "ProgCharging";
	if (state == Battery.State.FULLY_CHARGED) return "ProgCharging";
	return "Prog";
}
function Bat() {
	const bat = Battery.get_default();
	const className = Variable.derive([bind(bat, "warningLevel"), bind(bat, "state")], (w, s) => mapBatState(w, s));

	return <box
		className="Battery"
		tooltipText="Battery Percentage"
		widthRequest={120}
		heightRequest={120}
		halign={Gtk.Align.CENTER}
	>
		<overlay>
			<circularprogress
				className={className()}
				rounded
				value={bind(bat, "percentage")}
				startAt={0.75}
				endAt={0.75}
			>
				<icon />
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
