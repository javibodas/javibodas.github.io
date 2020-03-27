'use strict';

function ArticlesDesktopList(props){
    return (<div class="px-3 p-md-5">
              <div class="section-inner">
                  <div class="heading py-2"><h4>Articulos</h4></div>
                  <TreeArticles articles={props.articles} handleClickArticle={props.handleClickArticle}/>
                </div>
            </div>);
}