import { bind, exec, Variable } from "astal";
import { Gtk } from "astal/gtk3";

const quote = Variable("");

export default function Quote() {
	quote.set(exec("fortune"));

	return <box className="QuoteContainer"
		halign={Gtk.Align.CENTER}>
		<label
			className="Quote"
			halign={Gtk.Align.CENTER}
			truncate
			wrap
			maxWidthChars={55}
			label={bind(quote).as(content => getMaxContent(content))}
			tooltipText={bind(quote)}
		/>
		<button
			className="Refresh"
			halign={Gtk.Align.END}
			tooltipText="Refresh Quote"
			onClicked={() => {
				quote.set(exec("fortune"));
			}}
		>
			<icon icon="btsync-gui-10" />
		</button>
	</box>;
}

function getMaxContent(str: string) {
	let lines = str.split("\n");
	if (lines.length > 4) {
		return lines.slice(0, 3).map(each => each + "\n").toString() + "...";
	} else {
		return str;
	}
}
