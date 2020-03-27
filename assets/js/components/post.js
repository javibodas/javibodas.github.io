class Post extends React.Component{
	componentDidMount(){
		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});
	}
  	componentDidUpdate() {
  		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});
  	}

	render(){
		let post = this.props.post
		return(<article className="blog-post px-3 py-5 p-md-5">
						<div className="container">
							 <header className="blog-post-header">
						    	<h2 className="title mb-2">{post.title}</h2>
						    	<div className="meta mb-3"><span className="date">Publicado {post.publication_time}</span></div>
					    	 </header>
				   			 <div className="blog-post-body" dangerouslySetInnerHTML={{__html: post.content}}>
				   			 </div>
				   		</div>
				   	</article>);
	}		
}