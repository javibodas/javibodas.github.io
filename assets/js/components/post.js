//<article class="blog-post px-3 py-5 p-md-5">
//						<div class="container">
//							 <header class="blog-post-header">
////						    	<h2 class="title mb-2">{article.title}</h2>
//						    	<!--<div class="meta mb-3"><i class="fas fa-hashtag"></i>blockchain</div>-->
//						    	<div class="meta mb-3"><span class="date">Publicado {article.publication_time}</span><!--<span class="time">5 min read</span><span class="comment">--></div>
//					    	 </header>
//				   			 <div class="blog-post-body" dangerouslySetInnerHTML={{__html: post}}>
//				   			 </div>
//				   		</div>
//				   	</article>

class Post extends React.Component{
	constructor(props){
		super(props);
		this.state = {	article: {}	};
	}

	componentDidMount() {
    	this.setState({article: this.props.post})
  	}

  	componentDidUpdate() {
  		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});
  	}

	render(){
		let post = this.state.article
		console.log('Render post...' + post.title)
		return(<article class="blog-post px-3 py-5 p-md-5">
						<div class="container">
							 <header class="blog-post-header">
						    	<h2 class="title mb-2">{post.title}</h2>
						    	<div class="meta mb-3"><span class="date">Publicado {post.publication_time}</span></div>
					    	 </header>
				   			 <div class="blog-post-body" dangerouslySetInnerHTML={{__html: post.content}}>
				   			 </div>
				   		</div>
				   	</article>);
	}		
}