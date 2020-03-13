'use strict';

class HomeDesktopVersion extends React.Component{
	render() {
		return(<div class="sections-wrapper"><section class="blog-list px-3 py-5 p-md-4"><div class="container article-mobile-list"><ArticleMobileList/></div></section></div>);
	}
}

class Post extends React.Component{
	constructor(props){
		super(props);
		this.state = {
      		error: null,
      		isLoaded: false,
      		article: {}
    	};
	}

	htmlDecode(content) {
  		let e = document.createElement('div');
  		e.innerHTML = content;
  		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	}

	componentDidMount() {
    	fetch('https://api-bodblog.herokuapp.com/articles/home-default')
      	.then(res => res.json())
      	.then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            article: result
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

	render(){
		const { error, isLoaded, article } = this.state;
		if (error) {
      		return <Error />;
    	} else if (!isLoaded) {
      		return <Loading />;
    	} else {
    		let post = article.content.replace('<','&lt;').replace('>','&gt;');
			return(this.htmlDecode(post));
		}
	}		

}

function Loading(){
	return(<div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div></div>);
}

function Error(){
	return(<div><h2>Ups! Ha habido algún problema al recoger los artículos.</h2></div>);
}


ReactDOM.render((<Post/>), document.querySelector('.blog-post-body'));