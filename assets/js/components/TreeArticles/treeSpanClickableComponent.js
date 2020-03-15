class SpanClickable extends React.Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {open: 0, spanClass: '', ulClass: ''};
  }

  componentDidMount() {
    this.props.open ? this.setState({open: 1, spanClass: 'caret year-articles caret-down', ulClass: 'nested active'})
                  : this.setState({open: 0, spanClass: 'caret year-articles', ulClass: 'nested'})
  }

  handleClick(){
    this.state.open ? this.setState({open: 0, spanClass: 'caret year-articles', ulClass: 'nested'}) 
                    : this.setState({open: 1, spanClass: 'caret year-articles caret-down', ulClass: 'nested active'})
  }

  render(){
     return (<React.Fragment><span className={this.state.spanClass} onClick={this.handleClick}>{this.props.text}</span><ul className={this.state.ulClass}>{this.props.elements}</ul></React.Fragment>);
  }

}

export default SpanClickable;