'use strict';

class ArticlesTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          error: null,
          isLoaded: false,
          articles: []
    }; 
    this.data = JSON.parse('[{"year":"2020", "months":[{"month": "Febrero","articles":[{"title":"Aplicaciones Descentralizadas. Instalación y configuración", "link":"/public/posts/configuracion-dapp.html", "active" : 0}]},{"month": "Marzo", "articles":[{"title":"Aplicación Spring Boot en Heroku. Instalación y Configuración","link":"/public/posts/iniciar-proyecto-spring-y-heroku.html", "active" : 1}]}]}]');
  }

  create_list() {
    let list = []; 
    let years_articles = this.data;

    for(var y of years_articles){
        let active = 0; // This variable is used to expand the tree in month and year of article with active=1
        let months_html = [];
        let months_articles = y.months;        

        for(var m of months_articles){
            let articles_html = [];
            let articles_title = m.articles;
            
            for(var t of articles_title){
              active = t.active;
              articles_html.push(<Article link={t.link} title={t.title}/>);
            }

          months_html.push(<Month month={m.month} artics={articles_html} active={active}/>);
        }

      list.push(<Year year={y.year} months={months_html} active={active}/>);
    }
    return list;
  }

  render() {
    return (this.create_list());
  }
}

function Article(props){
  return (<li><a href={props.link}>{props.title}</a></li>);
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
    this.state = {
      open: props.open
    }
  }

  handleClick(){
    this.state.open ? this.setState({open: 0}) : this.setState({open: 1})
  }

  render(){
    if(this.state.open) return (<React.Fragment><span className='caret year-articles caret-down'>{this.props.text}</span><ul className='nested active'>{this.props.elements}</ul></React.Fragment>);
    else return (<React.Fragment><span className='caret year-articles'>{this.props.text}</span><ul className='nested'>{this.props.elements}</ul></React.Fragment>);
  }

}

ReactDOM.render(<ArticlesTree/>, document.querySelector('.article-list'));