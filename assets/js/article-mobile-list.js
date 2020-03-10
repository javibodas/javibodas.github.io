'use strict';

class ArticleMobileList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
      		error: null,
      		isLoaded: false,
      		items: []
    	};
		this.data = JSON.parse('[{"title":"Aplicaciones Descentralizadas. Instalación y configuración", "link":"/public/posts/configuracion-dapp.html","publication_date":"08/03/2020","active" : 0,"description":"En esta guía se mostrarán los pasos a seguir para crear una DAPP (Aplicación Descentralizada) basada en contratos inteligentes con la herramienta Truffle y blockchain con Ethereum. En esta primera parte se llevará a cabo la configuración del entorno de desarrollo."},{"title":"Aplicación Spring Boot en Heroku. Instalación y Configuración","publication_date":"08/03/2020","link":"/public/posts/iniciar-proyecto-spring-y-heroku.html", "active" : 1,"description":""}]');
	}

	 componentDidMount() {
    	fetch('https://api-bodblog.herokuapp.com/articles')
      	.then(res => res.json())
      	.then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            items: result.items
	          });
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
      	)
  	}

	createList() {
	    let list = [];
	    let articles = this.state.items;

	    for(var i = 0; i < articles.length; i++){
	      list.push(<Post title={articles[i].title} publication_date={articles[i].publication_date} description={articles[i].description} link={articles[i].link}/>);
	    }
	    return list;
	}

	render() {
		this.get_data();
		const { error, isLoaded, items } = this.state;
		if (error) {
      		return <div>Error: {error.message}</div>;
    	} else if (!isLoaded) {
      		return <div>Loading...</div>;
    	} else {
			return(this.createList());
		}
	}
}

class NextPrevNav extends React.Component {
  render() {
    return (<nav className='blog-nav nav nav-justified my-5'>
									  <a className='nav-link-prev nav-item nav-link d-none rounded-left' href='#'>Previous<i className='arrow-prev fas fa-long-arrow-alt-left'></i></a>
									  <a className='nav-link-next nav-item nav-link rounded' href='blog-list.html'>Next<i className='arrow-next fas fa-long-arrow-alt-right'></i></a>
									</nav>);
  }
}

//<div class="item mb-5">
//<div class="media">
//	<!--<img class="mr-3 img-fluid post-thumb d-none d-md-flex" src="/assets/images/blog/blog-post-thumb-1.jpg" alt="image">-->
//	<div class="media-body">
//		<h3 class="title mb-1"><a href="/public/posts/configuracion-dapp.html">Desarrollo de Aplicaciones Descentralizadas (DAPP). Parte I - Instalación y Configuración</a></h3>
//		<div class="meta mb-1"><span class="date">Publicado 02/02/2020</span><!--<span class="time">5 min read</span><span class="comment"><a href="#">8 comments</a></span>--></div>
//		<div class="intro">En esta guía se mostrarán los pasos a seguir para crear una DAPP (Aplicación Descentralizada) basada en contratos inteligentes con la herramienta Truffle y blockchain con Ethereum. En esta primera parte se llevará a cabo la configuración del entorno de desarrollo.</div>
//		<a class="more-link" href="/public/posts/configuracion-dapp.html"> Leer más &rarr;</a>
//	</div>
//</div>
//</div>

class Post extends React.Component {
	render(){
		return(<div class="item mb-5"><div class="media"><div class="media-body"><h3 class="title mb-1"><a href="/public/posts/configuracion-dapp.html">{this.props.title}</a></h3><div class="meta mb-1"><span class="date">Publicado {this.props.publication_date}</span></div><div class="intro">{this.props.description}</div><a class="more-link" href={this.props.link}> Leer más &rarr;</a></div></div></div>);
	}
}

const e = React.createElement;
const domContainer = document.querySelector('.article-mobile-list');

ReactDOM.render(e(ArticleMobileList), domContainer);