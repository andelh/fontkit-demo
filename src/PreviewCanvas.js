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
		// this.ctx = this.canvas.getContext('2d');
		// this.ctx2 = this.canvas2.getContext('2d');
		this.setState({ ratio: window.devicePixelRatio || 1 });
	}

	componentDidUpdate() {
		// this.draw6(this.ctx);
		// this.draw6(this.ctx2, true);
		// this.drawAndel(this.ctx);
		// this.setupCharacters(this.props.font);
		// this.drawLeft();
	}

	draw5(ctx) {
		let { font, run, fontSize, width, height } = this.props;
		//Saves the current transformation matrix
		ctx.save();
		console.log(ctx);

		ctx.scale(this.state.ratio, this.state.ratio);
		ctx.clearRect(0, 0, width, height);

		let scale = (1 / font.unitsPerEm) * fontSize;
		let x = 0;
		let y = 0;

		ctx.translate(0, 40);
		ctx.scale(1, -1);
		run.glyphs.forEach((glyph, index) => {
			console.log(run.positions);
			glyph.render(ctx, fontSize);
			ctx.moveTo(run.positions[index].xAdvance, 0);
		});
		// ctx.restore();
		ctx.restore();
	}

	drawAndel(ctx) {
		//Clear the current canvas
		//Import the font details from props
		//Save the canvas to memory at a default layout
		//Get the font run of the required string, which includes all the coordinates for drawing to canvas
		//Get the glyph spacing from the font run
		//Get the drawings and map them to the glyph advances 1 to 1

		let {
			font,
			run,
			fontSize,
			width,
			height,
			features,
			script,
			language,
			direction,
			text
		} = this.props;

		ctx.scale(1, -1);
		ctx.save();

		// console.log('Cleared rect');
		ctx.clearRect(0, 0, width, height);
		//Brings the font into view on the canvas
		ctx.translate(0, -200);

		//TODO REPLACE HARDCODED FONT SCALE VALUES- 150
		let fontScale = (1 / font.unitsPerEm) * 150;

		let glyphRun = font.layout(
			'Hello World',
			features,
			script,
			language,
			direction
		);

		console.log(glyphRun);

		ctx.translate(run.glyphs[0].bbox.maxX * fontScale, 0);
		ctx.beginPath();
		run.glyphs[0].render(ctx, 150);

		ctx.translate(run.glyphs[1].bbox.maxX * fontScale, 0);
		ctx.beginPath();
		run.glyphs[1].render(ctx, 150);

		ctx.translate(run.glyphs[2].bbox.maxX * fontScale, 0);
		ctx.beginPath();
		run.glyphs[2].render(ctx, 150);

		ctx.translate(run.glyphs[3].bbox.maxX * fontScale, 0);
		ctx.beginPath();
		run.glyphs[3].render(ctx, 150);

		ctx.translate(run.glyphs[4].bbox.maxX * fontScale, 0);
		ctx.beginPath();
		run.glyphs[4].render(ctx, 150);

		ctx.translate(run.glyphs[5].bbox.maxX * fontScale, 0);
		ctx.beginPath();
		run.glyphs[5].render(ctx, 150);

		ctx.translate(run.glyphs[6].bbox.maxX * fontScale, 0);
		ctx.beginPath();
		run.glyphs[6].render(ctx, 150);

		ctx.translate(run.glyphs[7].bbox.maxX * fontScale, 0);
		ctx.beginPath();
		run.glyphs[7].render(ctx, 150);

		ctx.translate(run.positions[8].xAdvance * fontScale, 0);
		ctx.beginPath();
		run.glyphs[8].render(ctx, 150);

		ctx.translate(run.positions[9].xAdvance * fontScale, 0);
		ctx.beginPath();
		run.glyphs[9].render(ctx, 150);

		ctx.translate(run.positions[10].xAdvance * fontScale, 0);
		ctx.beginPath();
		run.glyphs[10].render(ctx, 150);

		ctx.translate(run.positions[11].xAdvance * fontScale, 0);
		ctx.beginPath();
		run.glyphs[11].render(ctx, 150);

		ctx.translate(run.positions[12].xAdvance * fontScale, 0);
		ctx.beginPath();
		run.glyphs[12].render(ctx, 150);
	}

	draw6(ctx, flag) {
		// console.log('in draw function');
		let {
			font,
			run,
			fontSize,
			width,
			height,
			features,
			scipt,
			language,
			direction,
			text
		} = this.props;

		ctx.save();
		// console.log('1st Canvas Context Save');
		ctx.scale(this.state.ratio, this.state.ratio);

		// console.log('Cleared rect');
		ctx.clearRect(0, 0, width, height);

		let scale = (1 / font.unitsPerEm) * fontSize;
		let x = 0;
		let bbox = font.bbox.maxY + font.bbox.maxY / 2;
		let step = bbox;
		let y = 0;
		// console.log('Moving canvas to 0, 80');

		// ctx.translate(0, 80);
		// console.log('Scale set to 1, -1');

		ctx.scale(1, -1);

		let characters = this.setupCharacters(font);

		for (let i = 0; i < characters.length; i++) {
			let textRun = font.layout(
				`${i % 2 == 0 ? 'OH' : 'HO'}` +
				characters[i] +
				`${i % 2 == 0 ? 'HH' : 'OO'}`
				// features,
				// scipt,
				// language,
				// direction
			);
			textRun.glyphs.forEach((glyph, index) => {
				let pos = textRun.positions[index];
				ctx.save();

				// console.log(textRun);
				// console.log('Canvas content save in glyph run');

				ctx.translate(
					(x + pos.xOffset) * scale,
					(y + pos.yOffset) * scale
				);
				// console.log(
				// 	`Canvas translated ${(x + pos.xOffset) * scale}, ${(y +
				// 		pos.yOffset) *
				// 		scale}`
				// );

				ctx.beginPath();
				glyph.render(ctx, fontSize);
				ctx.restore();

				x += pos.xAdvance;

				y = -bbox + step;
			});

			x = 0;

			if (i % 2 == 0) {
				//Adjust the spacing between each pair HERE
				step -= bbox * 1;
			} else {
				step -= bbox / 1.3;
			}
		}

		ctx.restore();
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

	getHeight = font => {
		let bbox = font.bbox.maxY;
		let characters = this.setupCharacters(font);

		return bbox * characters.length;
	};

	draw(ctx) {
		console.log('in draw function');
		let { font, run, fontSize, width, height } = this.props;

		ctx.save();
		console.log('1st Canvas Context Save');
		ctx.scale(this.state.ratio, this.state.ratio);

		console.log('Cleared rect');
		ctx.clearRect(0, 0, width, height);

		let scale = (1 / font.unitsPerEm) * fontSize;
		let x = 0;
		let y = 0;

		console.log('Moving canvas to 0, 80');

		ctx.translate(0, 80);
		console.log('Scale set to 1, -1');

		ctx.scale(1, -1);

		run.glyphs.forEach((glyph, index) => {
			let pos = run.positions[index];
			ctx.save();
			console.log('Canvas content save in glyph run');

			ctx.translate((x + pos.xOffset) * scale, (y + pos.yOffset) * scale);
			console.log(
				`Canvas translated ${(x + pos.xOffset) * scale}, ${(y +
					pos.yOffset) *
				scale}`
			);

			ctx.beginPath();
			glyph.render(ctx, fontSize);
			ctx.restore();

			x += pos.xAdvance;
			y += pos.yAdvance;
		});

		x = 0;
		y = -800;

		run.glyphs.forEach((glyph, index) => {
			let pos = run.positions[index];
			ctx.save();
			console.log('Canvas content save in glyph run');

			ctx.translate((x + pos.xOffset) * scale, (y + pos.yOffset) * scale);
			console.log(
				`Canvas translated ${(x + pos.xOffset) * scale}, ${(y +
					pos.yOffset) *
				scale}`
			);

			ctx.beginPath();
			glyph.render(ctx, fontSize);
			ctx.restore();

			x += pos.xAdvance;
			y += pos.yAdvance;
		});

		ctx.restore();
	}

	render() {
		let { width, height, font, fontSize } = this.props;
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

			// fontVariationSettings: `"wght" ${parseInt(this.props.variationSettings.wght)}, "MONO" ${parseInt(this.props.variationSettings.MONO)}, "XPRN" ${parseInt(this.props.variationSettings.XPRN)}, "slnt" ${parseInt(this.props.variationSettings.slnt)}, "ital" ${parseInt(this.props.variationSettings.ital)}`

		}
		return (


			<div contentEditable style={style}>
				OOAOO HHAHH <br />
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
				OOZOO HHZHH <br />
			</div >
			// <div contentEditable style={style}>THE TEST OF TESTS</div >
		);
	}
}
