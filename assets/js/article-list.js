'use strict';

const e = React.createElement;

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
    // This info should be obtained by api 
    this.months = Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
    this.data = JSON.parse('[{"year":"2020", "months":[{"month": "Febrero","articles":[{"title":"Aplicaciones Descentralizadas. Instalación y configuración", "link":"public/posts/configuracion-dapp.html"}]},{"month": "Marzo", "articles" : [{"title":"Aplicación Spring Boot en Heroku. Instalación y Configuración","link":"public/posts/iniciar-proyecto-spring-y-heroku.html"}]}]}]');

    this.current_month = this.months[(new Date()).getMonth()];
    this.current_year = (new Date()).getFullYear();
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
            let articles_title = months_articles[0].articles;
            
            for(var k = 0; k < articles_title.length; k++){
              articles_html.push(<li><a href={articles_title[k].link}>{articles_title[k].title}</a></li>);
            }

          if(months_articles[j].month == this.current_month) months_html.push(<li><span className='caret month-articles caret-down'>{months_articles[j].month}</span><ul className='nested active'>{articles_html}</ul></li>);
          else months_html.push(<li><span className='caret month-articles'>{months_articles[j].month}</span><ul className='nested'>{articles_html}</ul></li>);
        }

      if(years_articles[i].year == this.current_year) list.push(<li><span className='caret year-articles caret-down'>{years_articles[i].year}</span><ul className='nested active'>{months_html}</ul></li>);
      else list.push(<li><span className='caret year-articles'>{years_articles[i].year}</span><ul className='nested'>{months_html}</ul></li>);
      
    }
    return list;
  }

  render() {
    return (this.create_list());
  }
}

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