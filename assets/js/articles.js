/** @jsx React.DOM */

'use strict';

const e = React.createElement;

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
    this.articles_title = ['Aplicaciones Descentralizadas. Instalación y configuración','Aplicación Spring Boot en Heroku. Instalación y Configuración'];
    this.months_name = ['Febrero','Marzo'];
    this.years_name = ['2020'];
  }

  createList() {
    let list = [];

    for(var i = 0; i < this.years_name; i++){
        let months_html = [];        

        for(var j = 0; j < this.months_name; j++){
            let articles_html = [];
            
            for(var k = 0; k < this.articles_title; j++){
              articles_html.push(<ul className='nested'><li></li></ul><a>{articles_title[k]}</a></a>);
            }

          months_html.push(<li><span className='caret month-articles'>{months_name[j]});
        }

      list.push(<li><span className="caret year-articles">{years_name[i]});
    }
    return list;
  }

  render() {
    return (<ul className='article-list'>{this.createList()});
  }
}

const domContainer = document.querySelector('.article-list');

ReactDOM.render(e(ArticlesList), domContainer);