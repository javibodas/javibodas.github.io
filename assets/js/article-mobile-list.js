'use strict';

class MobileVersion extends React.Component{
	render() {
		return(<div class="sections-wrapper"><section class="blog-list px-3 py-5 p-md-4"><div class="container article-mobile-list"><ArticleMobileList/></div></section></div>);
	}
}

class ArticleMobileList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
      		error: null,
      		isLoaded: false,
      		articles: []
    	};
	}

	componentDidMount() {
    	fetch('https://api-bodblog.herokuapp.com/articles')
      	.then(res => res.json())
      	.then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            articles: result
	          });
	        },
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
	    let articles = this.state.articles;

	    for(var i = 0; i < articles.length; i++){
	      list.push(<Post title={articles[i].title} publication_date={articles[i].publication_date} description={articles[i].description} link={articles[i].link}/>);
	    }
	    return list;
	}

	render() {
		const { error, isLoaded, articles } = this.state;
		if (error) {
      		return <Error />;
    	} else if (!isLoaded) {
      		return <Loading />;
    	} else {
			return(this.createList());
		}
	}
}

function Post(props){
	return(<div class="item mb-5"><div class="media"><div class="media-body"><h3 class="title mb-1"><a href={props.link}>{props.title}</a></h3><div class="meta mb-1"><span class="date">Publicado {props.publication_date}</span></div><div class="intro">{props.description}</div><a class="more-link" href={props.link}> Leer más &rarr;</a></div></div></div>);
}

function NextPrevNav(){
    return (<nav className='blog-nav nav nav-justified my-5'>
    			<a className='nav-link-prev nav-item nav-link d-none rounded-left' href='#'>Previous<i className='arrow-prev fas fa-long-arrow-alt-left'></i></a>
				<a className='nav-link-next nav-item nav-link rounded' href='blog-list.html'>Next<i className='arrow-next fas fa-long-arrow-alt-right'></i></a>
			</nav>);
}

function Loading(){
	return(<div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div></div>);
}

function Error(){
	return(<div><h2>Ups! Ha habido algún problema al recoger los artículos.</h2></div>);
}

//const e = React.createElement;
ReactDOM.render((<MobileVersion/>), document.querySelector('.mobile'));