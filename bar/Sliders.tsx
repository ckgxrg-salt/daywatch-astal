import Wp from "gi://AstalWp";
import Brightness from "../util/brightness";
import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";

export default function Sliders() {
	return <box
		vertical
		className="BarSliders"
	>
		<Volume />
		<Bright />
	</box>;
}

const showVol = Variable(false);
function Volume() {
	const speaker = Wp.get_default()?.audio.defaultSpeaker!

	return <box vertical>
		<revealer
			transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
			revealChild={bind(showVol)}
		>
			<slider
				vertical
				inverted
				className="BarAudio"
				widthRequest={40}
				onDragged={({ value }) => speaker.volume = value}
				value={bind(speaker, "volume")}
			/>
		</revealer>
		<button
			className="BarAudioIcon"
			widthRequest={40}
			heightRequest={40}
			onClicked={() => showVol.set(!showVol.get())}
		>
			<icon icon={bind(speaker, "volumeIcon")} />
		</button>
	</box>;
}

const showBrt = Variable(false);
function Bright() {
	const brightness = Brightness.get_default();

	return <box vertical>
		<revealer
			transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
			revealChild={bind(showBrt)}
		>
			<slider
				vertical
				inverted
				className="BarBright"
				widthRequest={40}
				onDragged={({ value }) => brightness.screen = value}
				value={bind(brightness, "screen")}
			/>
		</revealer>
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
	</box>;
}
