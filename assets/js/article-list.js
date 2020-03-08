'use strict';

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
    // This info should be obtained by api 
    this.data = JSON.parse('[{"year":"2020", "months":[{"month": "Febrero","articles":[{"title":"Aplicaciones Descentralizadas. Instalación y configuración", "link":"/public/posts/configuracion-dapp.html"}]}]}]');
    //this.data = JSON.parse('[{"year":"2020", "months":[{"month": "Febrero","articles":[{"title":"Aplicaciones Descentralizadas. Instalación y configuración", "link":"/public/posts/configuracion-dapp.html"}]},{"month": "Marzo", "articles":[{"title":"Aplicación Spring Boot en Heroku. Instalación y Configuración","link":"/public/posts/iniciar-proyecto-spring-y-heroku.html"}]}]}]');
  }

  get_articles(){
    
  }

  create_list() {
    let list = [];
    let years_articles = this.data;

    for(var i = 0; i < years_articles.length; i++){
        let months_html = [];
        let months_articles = years_articles[i].months;        

        for(var j = 0; j < months_articles.length; j++){
            let articles_html = [];
            let articles_title = months_articles[j].articles;
            
            for(var k = 0; k < articles_title.length; k++){
              articles_html.push(<Article link={articles_title[k].link} title={articles_title[k].title} />);
            }

          months_html.push(<Month month={months_articles[j].month} artics={articles_html} />);
        }

      list.push(<Year year={years_articles[i].year} months={months_html}/>);
    }
    return list;
  }

  render() {
    return (this.create_list());
  }
}

class Article extends React.Component{

  render(){
    return (<li><a href={this.props.link}>{this.props.title}</a></li>);
  }

}

class Month extends React.Component{
  constructor(props){
    super(props)
    this.months = Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
    this.current_month = this.months[(new Date()).getMonth()];
  }

  render(){
    if(this.props.month == this.current_month){
     return(<li><span className='caret month-articles caret-down'>{this.props.month}</span><ul className='nested active'>{this.props.artics}</ul></li>);
    }else{
      return(<li><span className='caret month-articles'>{this.props.month}</span><ul className='nested'>{this.props.artics}</ul></li>);
    }    
  }
}

class Year extends React.Component{
  constructor(props){
    super(props)
    this.current_year = (new Date()).getFullYear();
  }

  render(){
    if(this.props.year == this.current_year){
      return(<li><span className='caret year-articles caret-down'>{this.props.year}</span><ul className='nested active'>{this.props.months}</ul></li>);
    }else{ 
      return(<li><span className='caret year-articles'>{this.props.year}</span><ul className='nested'>{this.props.months}</ul></li>);
    }
  }
}

const e = React.createElement;
const domContainer = document.querySelector('.article-list');

ReactDOM.render(e(ArticlesList), domContainer);

// This sould be replaced by code in react using react elements instead html elements.
var toggler = document.getElementsByClassName("caret");
for (var i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
  });
}