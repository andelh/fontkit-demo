import autobind from 'autobind-decorator';
import { Component, cloneElement, h } from 'preact';
import fontkit from 'fontkit';
import blobToBuffer from 'blob-to-buffer';

@autobind
export default class FontLoader extends Component {
  state = {
    font: null
  }

  componentWillMount() {
    if (this.props.url) {
      this.loadURL(this.props.url);
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.url && props.url !== this.props.url) {
      this.loadURL(props.url);
    }
  }

  onChange(e) {
    let file = e.target.files && e.target.files[0];
    if (file) {
      console.log(file)
      this.loadBlob(file);
    }
  }

  loadURL(url) {
    console.log(url)
    console.log(this.props.url)
    fetch(this.props.url)
      .then(res => res.blob())
      .then(this.loadBlob, console.error);
  }

  loadBlob(blob) {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        throw err;
      }
      this.setState({
        font: fontkit.create(buffer)
      }, () => {
        // console.log(this.state)

        var junction_font = new FontFace('LoadedFont', buffer, { weight: `100 900` });
        junction_font.load().then(function (loaded_face) {
          // loaded_face holds the loaded FontFace
          console.log(loaded_face)
          document.fonts.add(loaded_face);
        }).catch(function (error) {
          // error occurred
          console.log(error)
        });
        console.log(junction_font)
      });
    });
  }

  render() {
    return (
      <div className="font-loader">
        <input type="file" onChange={this.onChange} />
        {this.state.font && this.props.children.map(c => cloneElement(c, { font: this.state.font }))}
      </div>
    );
  }
}
