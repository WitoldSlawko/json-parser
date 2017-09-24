import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      info: null,
      source: '',
      parser: '',
      href: '',
      fileName: ''
    };
    this.getJSON = this.getJSON.bind(this)
    this.link = this.link.bind(this)
    this.reader = this.reader.bind(this)
    this.fileNaming = this.fileNaming.bind(this)
  }
  
  link(event){
    this.setState({
      source: event.target.value
    })
  }
  fileNaming(name){
    this.setState({
      fileName: name.target.value
    })
  }

  getJSON() {
    var _this = this;
    this.serverRequest = 
      axios
        .get(_this.state.source)
        .then(function(result) {    
          _this.setState({
            info: result.data
          });
          _this.reader(_this.state.info)
        })
        
  }

  reader(resp){
    var blob = new Blob([JSON.stringify(resp, null, 2)], {type: "application/json"});
    var url  = URL.createObjectURL(blob);
    this.setState({
      parser: JSON.stringify(resp, null, 2),
      href: url
    })  
  }

  render() {
    return (
      <div className="container">
        <h1>JSON Parser</h1>
        <div className="panel">
          <input placeholder="Provide JSON link here ..." onChange={this.link} type="text" />
          <button onClick={this.getJSON}>Parse!</button>
        </div>
        <div className="download">
          <input disabled={this.state.parser.length === 0} placeholder="Provide file name to download here ..." onChange={this.fileNaming} type="text" />
          { this.state.fileName.length !== 0 ? <a href={this.state.href} download={`${this.state.fileName}.json`} content={'Download'} className="link">Download</a> : null}
        </div>
        <p className="parser">
          {this.state.parser.length !== 0 ? this.state.parser : ' Your well parsed for human eye JSON data will log here ...'}
        </p>
    </div> 
    );
  }
}

export default App;
