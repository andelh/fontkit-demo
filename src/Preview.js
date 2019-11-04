import autobind from 'autobind-decorator';
import { Component, h } from 'preact';
import PreviewCanvas from './PreviewCanvas';

const BLOBTEXT = `WELCOME TO FIXAFONT 1.0
`;
@autobind
export default class Preview extends Component {
	state = this.getNextState(this.props);

	componentWillReceiveProps(props) {
		if (props.font.postscriptName !== this.props.font.postscriptName) {
			this.setState(this.getNextState(props));
		}
	}

	getNextState(props) {
		return {
			text: BLOBTEXT,
			fontSize: this.props.fontSize || 50,
			features: {},
			script: null,
			language: null,
			direction: null
		};
	}

	onTextChange(e) {
		this.setState({ text: e.target.value });
	}

	onFontSizeChange(e) {
		this.setState({ fontSize: e.target.value });
	}

	onScriptChange(e) {
		this.setState({
			script: e.target.value,
			language: null,
			features: {}
		});
	}

	onLangChange(e) {
		this.setState({
			language: e.target.value,
			features: {}
		});
	}

	onDirChange(e) {
		this.setState({
			direction: e.target.value
		});
	}

	onFeatureChange(feature, e) {
		this.setState({
			features: { ...this.state.features, [feature]: e.target.checked }
		});
	}

	handleSpacingSelect = () => {
		const spacing = `
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
		`
		this.setState({ text: spacing })
	}

	handleBigDumpSelect = () => {
		const dump = `
		HHOHHOOHOO HHAHHOOAOO HHBHHOOBOO HHCHHOOCOO HHDHHOODOO HHEHHOOEOO HHFHHOOFOO HHGHHOOGOO HHIHHOOIOO HHJHHOOJOO HHKHHOOKOO HHLHHOOLOO HHMHHOOMOO HHNHHOONOO HHPHHOOPOO HHQHHOOQOO HHRHHOOROO HHSHHOOSOO HHTHHOOTOO HHUHHOOUOO HHVHHOOVOO HHWHHOOWOO HHXHHOOXOO HHYHHOOYOO HHZHHOOZOO
<br /><br />
008088088 0010088188 0020088288 0030088388 0040088488 0050088588 0060088688 0070088788 0090088988
		`
		this.setState({ text: dump })
	}

	handleKerningSelect = () => {
		const kerning = `
		lynx tuft frogs, dolphins abduct by proxy the ever awkward klutz, dud, dummkopf, jinx snubnose filmgoer, orphan sgt. renfruw grudgek reyfus, md. sikh psych if halt tympany jewelry sri heh! twyer vs jojo pneu fylfot alcaaba son of nonplussed halfbreed bubbly playboy guggenheim daddy coccyx sgraffito effect, vacuum dirndle impossible attempt to disvalue, muzzle the afghan czech czar and exninja, bob bixby dvorak wood dhurrie savvy, dizzy eye aeon circumcision uvula scrungy picnic luxurious special type carbohydrate ovoid adzuki kumquat bomb? afterglows gold girl pygmy gnome lb. ankhs acme aggroupment akmed brouhha tv wt. ujjain ms. oz abacus mnemonics bhikku khaki bwana aorta embolism vivid owls often kvetch otherwise, wysiwyg densfort wright you’ve absorbed rhythm, put obstacle kyaks krieg kern wurst subject enmity equity coquet quorum pique tzetse hepzibah sulfhydryl briefcase ajax ehler kafka fjord elfship halfdressed jugful eggcup hummingbirds swingdevil bagpipe legwork reproachful hunchback archknave baghdad wejh rijswijk rajbansi rajput ajdir okay weekday obfuscate subpoena liebknecht marcgravia ecbolic arcticward dickcissel pincpinc boldface maidkin adjective adcraft adman dwarfness applejack darkbrown kiln palzy always farmland flimflam unbossy nonlineal stepbrother lapdog stopgap sx countdown basketball beaujolais vb. flowchart aztec lazy bozo syrup tarzan annoying dyke yucky hawg gagzhukz cuzco squire when hiho mayhem nietzsche szasz gumdrop milk emplotment ambidextrously lacquer byway ecclesiastes stubchen hobgoblins crabmill aqua hawaii blvd. subquality byzantine empire debt obvious cervantes jekabzeel anecdote flicflac mechanicville bedbug couldn’t i’ve it’s they’ll they’d dpt. headquarter burkhardt xerxes atkins govt. ebenezer lg. lhama amtrak amway fixity axmen quumbabda upjohn hrumpf
		<br /><br />
		LYNX TUFT FROGS, DOLPHINS ABDUCT BY PROXY THE EVER AWKWARD KLUTZ, DUD, DUMMKOPF, JINX SNUBNOSE FILMGOER, ORPHAN SGT. RENFRUW GRUDGEK REYFUS, MD. SIKH PSYCH IF HALT TYMPANY JEWELRY SRI HEH! TWYER VS JOJO PNEU FYLFOT ALCAABA SON OF NONPLUSSED HALFBREED BUBBLY PLAYBOY GUGGENHEIM DADDY COCCYX SGRAFFITO EFFECT, VACUUM DIRNDLE IMPOSSIBLE ATTEMPT TO DISVALUE, MUZZLE THE AFGHAN CZECH CZAR AND EXNINJA, BOB BIXBY DVORAK WOOD DHURRIE SAVVY, DIZZY EYE AEON CIRCUMCISION UVULA SCRUNGY PICNIC LUXURIOUS SPECIAL TYPE CARBOHYDRATE OVOID ADZUKI KUMQUAT BOMB? AFTERGLOWS GOLD GIRL PYGMY GNOME LB. ANKHS ACME AGGROUPMENT AKMED BROUHHA TV WT. UJJAIN MS. OZ ABACUS MNEMONICS BHIKKU KHAKI BWANA AORTA EMBOLISM VIVID OWLS OFTEN KVETCH OTHERWISE, WYSIWYG DENSFORT WRIGHT YOU’VE ABSORBED RHYTHM, PUT OBSTACLE KYAKS KRIEG KERN WURST SUBJECT ENMITY EQUITY COQUET QUORUM PIQUE TZETSE HEPZIBAH SULFHYDRYL BRIEFCASE AJAX EHLER KAFKA FJORD ELFSHIP HALFDRESSED JUGFUL EGGCUP HUMMINGBIRDS SWINGDEVIL BAGPIPE LEGWORK REPROACHFUL HUNCHBACK ARCHKNAVE BAGHDAD WEJH RIJSWIJK RAJBANSI RAJPUT AJDIR OKAY WEEKDAY OBFUSCATE SUBPOENA LIEBKNECHT MARCGRAVIA ECBOLIC ARCTICWARD DICKCISSEL PINCPINC BOLDFACE MAIDKIN ADJECTIVE ADCRAFT ADMAN DWARFNESS APPLEJACK DARKBROWN KILN PALZY ALWAYS FARMLAND FLIMFLAM UNBOSSY NONLINEAL STEPBROTHER LAPDOG STOPGAP SX COUNTDOWN BASKETBALL BEAUJOLAIS VB. FLOWCHART AZTEC LAZY BOZO SYRUP TARZAN ANNOYING DYKE YUCKY HAWG GAGZHUKZ CUZCO SQUIRE WHEN HIHO MAYHEM NIETZSCHE SZASZ GUMDROP MILK EMPLOTMENT AMBIDEXTROUSLY LACQUER BYWAY ECCLESIASTES STUBCHEN HOBGOBLINS CRABMILL AQUA HAWAII BLVD. SUBQUALITY BYZANTINE EMPIRE DEBT OBVIOUS CERVANTES JEKABZEEL ANECDOTE FLICFLAC MECHANICVILLE BEDBUG COULDN’T I’VE IT’S THEY’LL THEY’D DPT. HEADQUARTER BURKHARDT XERXES ATKINS GOVT. EBENEZER LG. LHAMA AMTRAK AMWAY FIXITY AXMEN QUUMBABDA UPJOHN HRUMPF
		<br /><br />
		Aaron Abraham Adam Aeneas Agfa Ahoy Aileen Akbar Alanon Americanism Anglican Aorta April Fool’s Day Aqua Lung (Tm.) Arabic Ash Wednesday Authorized Version Ave Maria Away Axel Ay Aztec Bhutan Bill Bjorn Bk Btu. Bvart Bzonga California Cb Cd Cervantes Chicago Clute City, Tx. Cmdr. Cnossus Coco Cracker State, Georgia Cs Ct. Cwacker Cyrano David Debra Dharma Diane Djakarta Dm Dnepr Doris Dudley Dwayne Dylan Dzerzhinsk Eames Ectomorph Eden Eerie Effingham, Il. Egypt Eiffel Tower Eject Ekland Elmore Entreaty Eolian Epstein Equine Erasmus Eskimo Ethiopia Europe Eva Ewan Exodus Jan van Eyck Ezra Fabian February Fhara Fifi Fjord Florida Fm France Fs Ft. Fury Fyn Gabriel Gc Gdynia Gehrig Ghana Gilligan Karl Gjellerup Gk. Glen Gm Gnosis Gp.E. Gregory Gs Gt. Br. Guinevere Gwathmey Gypsy Gzags Hebrew Hf Hg Hileah Horace Hrdlicka Hsia Hts. Hubert Hwang Hai Hyacinth Hz. Iaccoca Ibsen Iceland Idaho If Iggy Ihre Ijit Ike Iliad Immediate Innocent Ione Ipswitch Iquarus Ireland Island It Iud Ivert Iwerks Ixnay Iy Jasper Jenks Jherry Jill Jm Jn Jorge Jr. Julie Kerry Kharma Kiki Klear Koko Kruse Kusack Kylie Laboe Lb. Leslie Lhihane Llama Lorrie Lt. Lucy Lyle Madeira Mechanic Mg. Minnie Morrie Mr. Ms. Mt. Music My Nanny Nellie Nillie Novocane Null Nyack Oak Oblique Occarina Odd Oedipus Off Ogmane Ohio Oil Oj Oklahoma Olio Omni Only Oops Opera Oqu Order Ostra Ottmar Out Ovum Ow Ox Oyster Oz Parade Pd. Pepe Pfister Pg. Phil Pippi Pj Please Pneumonia Porridge Price Psalm Pt. Purple Pv Pw Pyre Qt. Quincy Radio Rd. Red Rhea Right Rj Roche Rr Rs Rt. Rural Rwanda Ryder Sacrifice Series Sgraffito Shirt Sister Skeet Slow Smore Snoop Soon Special Squire Sr St. Suzy Svelte Swiss Sy Szach Td Teach There Title Total Trust Tsena Tulip Twice Tyler Tzean Ua Udder Ue Uf Ugh Uh Ui Uk Ul Um Unkempt Uo Up Uq Ursula Use Utmost Uvula Uw Uxurious Uzßai Valerie Velour Vh Vicky Volvo Vs Water Were Where With World Wt. Wulk Wyler Xavier Xerox Xi Xylophone Yaboe Year Yipes Yo Ypsilant Ys Yu Zabar’s Zero Zhane Zizi Zorro Zu Zy Don’t I’ll I’m I’se
		<br /><br />
		0010203040500607080900<br />
		10112131415116171819100<br />
		20212232425226272829200<br />
		30313233435336373839300<br />
		40414243445446474849400<br />
		50515253545556575859500<br />
		6061626364656676869600<br />
		7071727374757677879700<br />
		8081828384858687889800<br />
		9091929394959697989900<br />
		<br />
		(1)(2)(3)(4)(5)(6)(7)(8)(9)(0) <br />
		<br />
		$00 $10 $20 $30 $40 $50 $60 $70 $80 $90<br />
		<br />
		£00 £10 £20 £30 £40 £50 £60 £70 £80 £90<br />
		<br />
		00¢ 11¢ 22¢ 33¢ 44¢ 55¢ 66¢ 77¢ 88¢ 99¢<br />
		<br />
		00% 0‰ 0-0.0,0…0°<br />
		11% 1‰ 1-1.1,1…1°<br />
		12% 2‰ 2-2.2,2…2°<br />
		13% 3‰ 3-3.3,3…3°<br />
		14% 4‰ 4-4.4,4…4°<br />
		15% 5‰ 5-5.5,5…5°<br />
		16% 6‰ 6-6.6,6…6°<br />
		17% 7‰ 7-7.7,7…7°<br />
		18% 8‰ 8-8.8,8…8°<br />
		19% 9‰ 9-9.9,9…9°<br />
		`
		this.setState({ text: kerning })
	}

	render() {
		let font = this.props.font;
		let run = font.layout(
			this.state.text,
			this.state.features,
			this.state.script,
			this.state.language,
			this.state.direction
		);
		let scripts = (font.GSUB ? font.GSUB.scriptList : []).concat(
			font.GPOS ? font.GPOS.scriptList : []
		);
		let scriptTags = Array.from(new Set(scripts.map(s => s.tag)));
		let selectedScript = scripts.find(s => s.tag === run.script);
		let languages = selectedScript
			? selectedScript.script.langSysRecords
			: [];
		let directions = ['ltr', 'rtl'];

		return (
			<div className="preview">
				<div className="render-type">
					<button onClick={() => this.handleSpacingSelect()}>Spacing</button>
					<button onClick={() => this.handleBigDumpSelect()}>Big Dump</button>
					<button onClick={() => this.handleKerningSelect()}>Kerning</button>

				</div>
				<div className="font-size">
					<label>Size:</label>
					<input
						type="range"
						min={0}
						max={500}
						value={this.state.fontSize}
						onInput={this.onFontSizeChange}
					/>
				</div>
				<PreviewCanvas
					run={run}
					text={this.state.text}
					font={this.props.font}
					fontSize={this.state.fontSize}
					features={this.state.features}
					script={this.state.script}
					language={this.state.language}
					direction={this.state.direction}
					variationSettings={this.props.variationSettings}
				/>
				{/* <div className="text-input">
					<input
						type="text"
						value={this.state.text}
						onInput={this.onTextChange}
					/>
				</div> */}

				<div className="feature-selector">
					<label>Script:</label>
					<select onChange={this.onScriptChange}>
						{scriptTags.map(script => (
							<option selected={run.script === script}>
								{script}
							</option>
						))}
					</select>

					<label>Language:</label>
					<select onChange={this.onLangChange}>
						<option>Default</option>
						{languages.map(lang => (
							<option
								value={lang.tag}
								selected={run.language === lang.tag}
							>
								{lang.tag}
							</option>
						))}
					</select>

					<label>Direction:</label>
					<select onChange={this.onDirChange}>
						<option value="">Default</option>
						{directions.map(direction => (
							<option selected={run.direction === direction}>
								{direction}
							</option>
						))}
					</select>

					<div className="features">
						{this.props.font
							.getAvailableFeatures(run.script, run.language)
							.map(feat => (
								<label>
									<input
										type="checkbox"
										checked={run.features[feat]}
										onChange={this.onFeatureChange.bind(
											this,
											feat
										)}
									/>{' '}
									{feat}
								</label>
							))}
					</div>
				</div>
			</div>
		);
	}
}
