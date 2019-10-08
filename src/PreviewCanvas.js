import { Component, h } from 'preact';
import * as OpenType from 'opentype.js';

export default class PreviewCanvas extends Component {
	static defaultProps = {
		width: 1400,
		height: 5000
	};

	state = {
		ratio: 1
	};

	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
		this.ctx2 = this.canvas2.getContext('2d');
		this.setState({ ratio: window.devicePixelRatio || 1 });
	}

	componentDidUpdate() {
		this.draw6(this.ctx);
		this.draw6(this.ctx2, true);
		this.setupCharacters(this.props.font);
		// this.drawLeft();
	}

	draw3(ctx) {
		let { font, run, fontSize, width, height } = this.props;

		ctx.scale(this.state.ratio, this.state.ratio);
		ctx.clearRect(0, 0, width, height);

		let scale = (1 / font.unitsPerEm) * fontSize;
		let x = 0;
		let y = 0;
		let lineY = 0;

		ctx.translate(0, 80);
		ctx.scale(1, -1);
		ctx.save();
		let currentRun = font.layout(
			`OO${String.fromCharCode(65)}${String.fromCharCode(65)}OO`
		);
		currentRun.glyphs.forEach((glyph, index) => {
			let pos = currentRun.positions[index];

			ctx.translate(40, 0);
			ctx.beginPath();
			glyph.render(ctx, fontSize);

			// ctx.restore();
			// x += pos.xAdvance;
			// y += pos.yAdvance;
		});

		ctx.translate(-6 * 40, -60);

		currentRun.glyphs.forEach((glyph, index) => {
			let pos = currentRun.positions[index];
			ctx.save();

			ctx.translate(40, 0);
			// ctx.moveTo(0, 50 * 1);
			ctx.beginPath();
			glyph.render(ctx, fontSize);

			// ctx.restore();
			// x += pos.xAdvance;
			// y += pos.yAdvance;
		});

		// run.glyphs.forEach((glyph, index) => {
		// 	let pos = run.positions[index];
		// 	ctx.save();
		// 	ctx.translate((x + pos.xOffset) * scale, (y + pos.yOffset) * scale);
		// 	ctx.beginPath();
		// 	glyph.render(ctx, fontSize);
		// 	ctx.restore();

		// 	x += pos.xAdvance;
		// 	y += pos.yAdvance * 2;
		// });

		ctx.restore();
	}

	draw2(ctx) {
		let { font, run, fontSize, width, height } = this.props;

		ctx.save();
		ctx.scale(this.state.ratio, this.state.ratio);
		ctx.clearRect(0, 0, width, height);

		let scale = (1 / font.unitsPerEm) * fontSize;
		let x = 0;
		let y = 0;
		let lineY = 0;

		ctx.translate(0, 80);
		ctx.scale(1, -1);
		for (let i = 0; i < 3; i++) {
			let currentRun = font.layout(
				`OO${String.fromCharCode(65 + i)}${String.fromCharCode(
					65 + i
				)}OO`
			);
			currentRun.glyphs.forEach((glyph, index) => {
				let pos = currentRun.positions[index];
				ctx.save();
				// ctx.moveTo(0, 50 * 1);

				ctx.translate(40, -50 * i);
				console.log(ctx);
				ctx.beginPath();
				glyph.render(ctx, fontSize);

				// ctx.restore();
				// x += pos.xAdvance;
				// y += pos.yAdvance;
			});
		}

		// run.glyphs.forEach((glyph, index) => {
		// 	let pos = run.positions[index];
		// 	ctx.save();
		// 	ctx.translate((x + pos.xOffset) * scale, (y + pos.yOffset) * scale);
		// 	ctx.beginPath();
		// 	glyph.render(ctx, fontSize);
		// 	ctx.restore();

		// 	x += pos.xAdvance;
		// 	y += pos.yAdvance * 2;
		// });

		ctx.restore();
	}

	draw4(ctx) {
		let { font, run, fontSize, width, height } = this.props;
		console.log(this.props.run);

		//Saves the current transformation matrix
		ctx.save();
		console.log(ctx);

		ctx.scale(this.state.ratio, this.state.ratio);
		ctx.clearRect(0, 0, width, height);

		let scale = (1 / font.unitsPerEm) * fontSize;
		let x = 0;
		let y = 0;

		for (let i = 0; i < 2; i++) {
			ctx.translate(0, 40);
			ctx.scale(1, -1);
			run.glyphs.forEach((glyph, index) => {
				let pos = run.positions[index];
				// console.log(pos);
				ctx.save();
				console.log(ctx);
				ctx.translate(
					(x + pos.xOffset) * scale,
					(y + pos.yOffset) * scale
				);
				ctx.beginPath();
				glyph.render(ctx, fontSize);
				ctx.restore();

				x += pos.xAdvance;
				y += pos.yAdvance;
			});
			// ctx.restore();
		}
		ctx.restore();
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

		// characters.map((letter, index) => {
		// 	let textRun = font.layout(
		// 		`OO${letter.toString().trim()}OO`,
		// 		features,
		// 		scipt,
		// 		language,
		// 		direction
		// 	);
		// 	textRun.glyphs.forEach((glyph, index) => {
		// 		let pos = textRun.positions[index];
		// 		ctx.save();

		// 		// console.log(textRun);
		// 		// console.log('Canvas content save in glyph run');

		// 		ctx.translate(
		// 			(x + pos.xOffset) * scale,
		// 			(y + pos.yOffset) * scale
		// 		);
		// 		// console.log(
		// 		// 	`Canvas translated ${(x + pos.xOffset) * scale}, ${(y +
		// 		// 		pos.yOffset) *
		// 		// 		scale}`
		// 		// );

		// 		ctx.beginPath();
		// 		glyph.render(ctx, fontSize);
		// 		ctx.restore();

		// 		x += pos.xAdvance;
		// 		// y += pos.yAdvance;
		// 		y = -bbox + step;
		// 	});

		// 	x = 0;
		// 	step -= bbox;
		// });

		for (let i = 0; i < characters.length; i++) {
			let textRun = font.layout(
				`${i % 2 == 0 ? 'OH' : 'HO'}` +
					characters[i].toString().trim() +
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
				step -= bbox;
			} else {
				step -= bbox / 1.5;
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
		let { width, height, font } = this.props;
		return (
			<div>
				<canvas
					width={width * this.state.ratio}
					height={height * this.state.ratio}
					style={{ width: 'auto', height }}
					ref={c => (this.canvas = c)}
				/>
				<canvas
					width={width * this.state.ratio}
					height={height * this.state.ratio}
					style={{ width, height }}
					ref={c => (this.canvas2 = c)}
				/>
			</div>
		);
	}
}
