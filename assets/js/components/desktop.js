'use strict';

class HomeDesktopVersion extends React.Component{
	render() {
		return(<div class="row desktop">
					<React.Fragment>
						<div class="col-lg-9 col-12"><Post /></div>
						<div class="col-lg-3 col-12 right-bar"></div>
					</React.Fragment>
				</div>);
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

  	componentDidUpdate() {
  		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});
  	}

	render(){
		const { error, isLoaded, article } = this.state;
		if (error) {
      		return <Error />;
    	} else if (!isLoaded) {
      		return <Loading />;
    	} else {
    		let post = article.content
			return(<article class="blog-post px-3 py-5 p-md-5">
						<div class="container">
							 <header class="blog-post-header">
						    	<h2 class="title mb-2">{article.title}</h2>
						    	//<!--<div class="meta mb-3"><i class="fas fa-hashtag"></i>blockchain</div>-->
						    	<div class="meta mb-3"><span class="date">Publicado {article.publication_time}</span><!--<span class="time">5 min read</span><span class="comment">--></div>
					    	 </header>
				   			 <div class="blog-post-body" dangerouslySetInnerHTML={{__html: post}}>
				   			 </div>
				   		</div>
				   	</article>);
		}
	}		

}

function Loading(){
	return(<div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div></div>);
}

function Error(){
	return(<div><h2>Ups! Ha habido algún problema al recoger los artículos.</h2></div>);
}


ReactDOM.render((<Post/>), document.querySelector('.post-charge'));