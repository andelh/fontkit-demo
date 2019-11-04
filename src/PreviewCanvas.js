import { Component, h } from 'preact';
import * as OpenType from 'opentype.js';
import * as _ from 'lodash'


export default class PreviewCanvas extends Component {
	static defaultProps = {
		width: 1500,
		height: 10000
	};

	state = {
		ratio: 2
	};

	componentDidMount() {
	}

	componentDidUpdate() {
	}



	setupCharacters = font => {
		let characters = ['A'];
		for (let i = 0; i < 96; i++) {
			let letter = String.fromCharCode(65 + i);

			if (font.hasGlyphForCodePoint(65 + i)) {
				characters.push(letter);
				characters.push(letter);
			}
		}
		return characters;
	};


	render() {
		let { width, height, font, fontSize, text } = this.props;
		// console.log(this.props.font.variationAxes)
		const settings = this.props.variationSettings
		var result = Object.keys(settings).map(function (key) {
			return `"${String(key)}" ${parseInt(settings[key])}`;
		});
		// console.log(Object.entries(settings));
		// console.log(result)
		// console.log(result.toString())
		const style = {
			fontFamily: 'LoadedFont',
			fontSize: `${fontSize}px`,
			fontWeight: parseInt(this.props.variationSettings.wght),
			fontVariationSettings: result.toString(),
			lineHeight: '100%',
			marginTop: '50px'
		}
		return (


			<div contentEditable style={style} dangerouslySetInnerHTML={{ __html: text }}>
				{/* OOAOO HHAHH <br />
				OOBOO HHBHH <br />
				OOCOO HHCHH <br />
				OODOO HHDHH <br />
				OOEOO HHEHH <br />
				OOFOO HHFHH <br />
				OOGOO HHGHH <br />
				OOHOO HHHHH <br />
				OOIOO HHIHH <br />
				OOJOO HHJHH <br />
				OOKOO HHKHH <br />
				OOLOO HHLHH <br />
				OOMOO HHMHH <br />
				OONOO HHNHH <br />
				OOOOO HHOHH <br />
				OOPOO HHPHH <br />
				OOQOO HHQHH <br />
				OOAOO HHAHH <br />
				OOROO HHRHH <br />
				OOSOO HHSHH <br />
				OOTOO HHTHH <br />
				OOUOO HHUHH <br />
				OOVOO HHVHH <br />
				OOWOO HHWHH <br />
				OOXOO HHXHH <br />
				OOYOO HHYHH <br />
				OOZOO HHZHH <br /> */}
			</div >
		);
	}
}
