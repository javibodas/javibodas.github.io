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

    for(var i = 0; i < this.years_name.length; i++){
        let months_html = [];        

        for(var j = 0; j < this.months_name.length; j++){
            let articles_html = [];
            
            for(var k = 0; k < this.articles_title.length; k++){
              articles_html.push(<li><a>{articles_title[k]}</a></li>);
            }

          months_html.push(<li><span className='caret month-articles'>{months_name[j]}</span><ul className="nested">{articles_html}</ul></li>);
        }

      list.push(<li><span className="caret year-articles">{years_name[i]}</span><ul class="nested">{months_html}</ul></li>);
      //list = React.createElement("li", null, 
      //                React.createElement("span", { className: "caret year-articles"}, years_name[i]), 
      //                  React.createElement("ul", { class: "nested" }, months_html));
    }
    return list;
  }

  render() {
    return (<ul className='article-list'>{this.createList()}</ul>);
  }
}

const domContainer = document.querySelector('.article-list');

ReactDOM.render(e(ArticlesList), domContainer);