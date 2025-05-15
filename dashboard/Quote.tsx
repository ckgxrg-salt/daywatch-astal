import { bind, exec, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import Pango from "gi://Pango";

const quote = Variable("");

export default function Quote() {
	quote.set(exec("fortune"));

	return <box
		className="QuoteContainer"
		halign={Gtk.Align.CENTER}
		heightRequest={150}
	>
		<label
			className="Quote"
			widthRequest={770}
			halign={Gtk.Align.CENTER}
			truncate
			wrap
			wrapMode={Pango.WrapMode.CHAR}
			maxWidthChars={55}
			label={bind(quote).as(content => removeLeadingComma(getMaxContent(content)))}
			tooltipText={bind(quote)}
		/>
		<button
			className="Refresh"
			widthRequest={50}
			halign={Gtk.Align.END}
			tooltipText="Refresh Quote"
			onClicked={() => {
				quote.set(exec("fortune"));
			}}
		>
			<icon icon="dialog-information" />
		</button>
	</box>;
}

function getMaxContent(str: string) {
	let lines = str.split("\n");
	if (lines.length > 4) {
		return lines.slice(0, 3).map(each => each + "\n").toString() + lines.at(4) + "...";
	} else {
		return str;
	}
}

// Strange Pango behaviour
function removeLeadingComma(str: string) {
	return str.replaceAll("\n,", "\n");
}
