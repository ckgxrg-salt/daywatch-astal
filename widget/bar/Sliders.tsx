import Wp from "gi://AstalWp";
import Brightness from "../../util/brightness";
import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";

export default function Sliders() {
	return <box
		className="BarSliders"
	>
		<Volume />
		<Bright />
	</box>;
}

const showVol = Variable(false);
function Volume() {
	const speaker = Wp.get_default()?.audio.defaultSpeaker!

	return <box>
		<button
			className="BarAudioIcon"
			widthRequest={40}
			heightRequest={40}
			onClicked={() => showVol.set(!showVol.get())}
		>
			<icon icon={bind(speaker, "volumeIcon")} />
		</button>
		<revealer
			transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
			revealChild={bind(showVol)}
		>
			<slider
				className="BarAudio"
				halign={Gtk.Align.CENTER}
				onDragged={({ value }) => speaker.volume = value}
				value={bind(speaker, "volume")}
			/>
		</revealer>
	</box>;
}

const showBrt = Variable(false);
function Bright() {
	const brightness = Brightness.get_default();

	return <box>
		<button
			className="BarBrightIcon"
			widthRequest={40}
			heightRequest={40}
			onClicked={() => showBrt.set(!showBrt.get())}
		>
			<icon
				icon="weather-clear"
			/>
		</button>
		<revealer
			transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
			revealChild={bind(showBrt)}
		>
			<slider
				className="BarBright"
				halign={Gtk.Align.CENTER}
				onDragged={({ value }) => brightness.screen = value}
				value={bind(brightness, "screen")}
			/>
		</revealer>
	</box>;
}
