import Wp from "gi://AstalWp";
import Brightness from "../../util/brightness";
import { bind } from "astal";
import { Gtk } from "astal/gtk3";

export default function Sliders() {
	return <box
		className="Sliders"
		widthRequest={200}
		heightRequest={230}
	>
		<Volume />
		<Bright />
	</box>;
}

function Volume() {
	const speaker = Wp.get_default()?.audio.defaultSpeaker!

	return <overlay passThrough>
		<slider
			className="AudioSlider"
			vertical
			inverted
			halign={Gtk.Align.CENTER}
			onDragged={({ value }) => speaker.volume = value}
			value={bind(speaker, "volume")}
		/>
		<box
			className="AudioIcon"
			sensitive={false}
			halign={Gtk.Align.CENTER}
		>
			<icon
				valign={Gtk.Align.START}
				icon={bind(speaker, "volumeIcon")}
			/>
		</box>
	</overlay>;
}

function Bright() {
	const brightness = Brightness.get_default();

	return <overlay passThrough>
		<slider
			className="BrightnessSlider"
			vertical
			inverted
			halign={Gtk.Align.CENTER}
			onDragged={({ value }) => brightness.screen = value}
			value={bind(brightness, "screen")}
		/>
		<box
			className="BrightnessIcon"
			sensitive={false}
			halign={Gtk.Align.CENTER}
		>
			<icon
				valign={Gtk.Align.START}
				icon="weather-clear"
			/>
		</box>
	</overlay>
}
