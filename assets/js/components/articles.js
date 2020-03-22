'use strict';

class Articles extends React.Component{
  render() {
    return (<div class="px-3 p-md-5">
              <div class="section-inner">
                  <div class="heading py-2"><h4>Articulos</h4></div>
                  <ArticlesTree articles={this.props.articles} clickArticle={this.props.clickArticle}/>
                </div>
            </div>);
  }
}

class ArticlesTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [] }; 
  }

  componentDidMount() {
    this.setState({articles: this.props.articles});
  }

  createList() {
    let list = []; 
    let years_articles = this.state.articles;

    for(var y of years_articles){
        let months_html = [];
        let months_articles = y.months;        

        for(var m of months_articles){
            let articles_html = [];
            let articles_title = m.articles;
            
            for(var a of articles_title){
              articles_html.push(<Article id={a.id} link={a.link} title={a.title} click={this.props.clickArticle}/>);
            }

          months_html.push(<Month month={m.month} artics={articles_html} active={m.active}/>);
        }

      list.push(<Year year={y.year} months={months_html} active={y.active}/>);
    }
    return list;
  }

  render() {
    return (<ul class="article-list">{this.createList()}</ul>);
  }
}

function Article(props){
  return (<li onClick={props.click(props.id)}><a href={props.link}>{props.title}</a></li>);
}

function Month(props){
  return(<li><SpanClickable open={props.active} text={props.month} elements={props.artics}/></li>); 
}

function Year(props){
  return(<li><SpanClickable open={props.active} text={props.year} elements={props.months}/></li>);
}

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