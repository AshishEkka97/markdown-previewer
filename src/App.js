import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Input } from 'reactstrap';
import marked from 'marked';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.com), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let's not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)",
      preview: "",
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      editor: event.target.value,
      preview: marked(event.target.value),
    })
  }

  componentDidMount () {
    var renderer = new marked.Renderer();
    renderer.link = function(href, title, text) {
        var link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace("<a","<a target='_blank' ");
    };
    marked.setOptions(
      { sanitize: true, renderer: renderer, tables: true, breaks: true, gfm: true }
    )

    const script = document.createElement("script");
    script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;
    document.body.appendChild(script);

    this.setState({
      preview: marked(this.state.editor),
    })
  }

  render() {
    return (
      <div className="App">
        <Row style={{marginLeft: 0, marginRight: 0, paddingTop: "10px"}}>
          <Col m="6">
            <Card style={{height: "95vh"}}>
              <CardHeader>Markdown</CardHeader>
              <CardBody>
                <Input
                  type="textarea"
                  id="editor"
                  value={this.state.editor}
                  style={{height: "100%"}}
                  onChange={this.handleChange}
                >
                </Input>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card style={{height: "95vh"}}>
              <CardHeader>Preview</CardHeader>
              <CardBody>
                <Card
                  style={{height: "100%", overflow: "hidden"}}
                >
                <div
                  id="preview"
                  className = "previewStyle"
                  dangerouslySetInnerHTML={{__html: this.state.preview}}
                >
                </div>
                </Card>
                {/* <Input
                  type="textarea"
                  id="preview"
                  value={this.state.preview}
                  style={{height: "100%", background: "white"}}
                  readOnly
                >
                </Input> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
