'use strict';

class ArticlesTreeList extends React.Component {
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

    for(let y in years_articles){
        let active = 0; // This variable is used to expand the tree in month and year of article with active=1
        let months_html = [];
        let months_articles = y.months;        

        for(let m in months_articles){
            let articles_html = [];
            let articles_title = m.articles;
            
            for(let t in articles_title){
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
  return (<li><a href={this.props.link}>{this.props.title}</a></li>);
}

function Month(props){
  return(<li><SpanClickable open={this.props.active} text={this.props.month} elements={this.props.artics}/></li>); 
}

function Year(){
  return(<li><SpanClickable open={this.props.active} text={this.props.year} elements={this.props.months}/></li>);
}

class SpanClickable extends React.Component(){

  constructor(props){
    super(props);
    this.state = {
      open: props.open
    }
  }

  handleClick(){
    this.state.open ? this.state.open = 0 : this.state.open = 1
  }

  render(){
    if(this.state.open) return (<React.Fragment><span className='caret year-articles caret-down'>{this.props.text}</span><ul className='nested active'>{this.props.elements}</ul></React.Fragment>);
    else return (<React.Fragment><span className='caret year-articles'>{this.props.text}</span><ul className='nested'>{this.props.elements}</ul></React.Fragment>);
  }

}

ReactDOM.render(<ArticlesTreeList/>, document.querySelector('.article-list'));

// This sould be replaced by code in react using react elements instead html elements.
/*var toggler = document.getElementsByClassName("caret");
for (var i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
  });
}*/