'use strict';

const e = React.createElement;
var months = Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
    //
    this.month = months[(new Date()).getMonth()];
    this.year = (new Date()).getFullYear();
    // This info should be obtained by api 
    this.articles_title = ['Aplicaciones Descentralizadas. Instalación y configuración','Aplicación Spring Boot en Heroku. Instalación y Configuración'];
    this.months_name = ['Febrero','Marzo'];
    this.years_name = ['2020'];
  }

  get_articles(){
    
  }

  create_list() {
    let list = [];

    for(var i = 0; i < this.years_name.length; i++){
        let months_html = [];        

        for(var j = 0; j < this.months_name.length; j++){
            let articles_html = [];
            
            for(var k = 0; k < this.articles_title.length; k++){
              articles_html.push(<li><a>{this.articles_title[k]}</a></li>);
            }

          if(this.months_name[i] == this.month) months_html.push(<li><span className='caret month-articles caret-down'>{this.months_name[j]}</span><ul className='nested active'>{articles_html}</ul></li>);
          else months_html.push(<li><span className='caret month-articles'>{this.months_name[j]}</span><ul className='nested'>{articles_html}</ul></li>);
        }

      if(this.years_name[i] == this.year) list.push(<li><span className='caret year-articles caret-down'>{this.years_name[i]}</span><ul class='nested active'>{months_html}</ul></li>);
      else list.push(<li><span className='caret year-articles'>{this.years_name[i]}</span><ul class='nested'>{months_html}</ul></li>);
      
    }
    return list;
  }

  render() {
    return (this.create_list());
  }
}

const domContainer = document.querySelector('.article-list');

ReactDOM.render(e(ArticlesList), domContainer);