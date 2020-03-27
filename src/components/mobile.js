'use strict';

class MobileVersion extends React.Component{

	constructor(props){
		super(props);
		this.state = { error: null, isLoadedList: false, isLoadedPost: false, articles: [], post: {}};
		this.handleClickPost = this.handleClickPost.bind(this);
	}

	componentDidMount() {
    	fetch('https://api-bodblog.herokuapp.com/articles')
      	.then(res => res.json())
      	.then(
	        (result) => {
	          this.setState({
	            isLoadedList: true,
	            isLoadedPost: false,
	            articles: result
	          });
	        },
	        (error) => {
	          this.setState({
	            isLoadedList: true,
	            error
	          });
	        }
      	)
  	}

  	handleClickPost(id){
		fetch('https://api-bodblog.herokuapp.com/articles/' + id)
    	.then(res => res.json())
	    .then(
	      (result) => {
	        this.setState({
	          isLoadedPost: true,
	          isLoadedList: false,
	          post: result
	        });
	      },
	      (error) => {
	        this.setState({
	          isLoadedPost: false,
	          error
	        });
	      }
	    );
	}

	render() {
		const { error, isLoadedList, isLoadedPost, articles, post } = this.state;
		if (error) {
      		return <Error />;
    	} else if (!isLoadedPost && !isLoadedList) {
      		return <Loading />;
    	} else if(isLoadedList) {

			return(<div className="mobile">
						<div className="sections-wrapper">
							<section className="blog-list px-3 py-5 p-md-4">
								<div className="container article-mobile-list"><ArticleMobileList articles={articles} handleClickPost={this.handleClickPost}/>
								</div>
							</section>
						</div>
					</div>);
		}else if(isLoadedPost){
			return(<div className="row desktop">
						<div className="col-lg-9 col-12"><Post post={post}/></div>
				</div>);

		}
	}
}

function Loading(){
	return(<div><div className="spinner-grow text-dark" role="status"><span className="sr-only">Loading...</span></div><div className="spinner-grow text-dark" role="status"><span className="sr-only">Loading...</span></div><div className="spinner-grow text-dark" role="status"><span className="sr-only">Loading...</span></div><div className="spinner-grow text-dark" role="status"><span className="sr-only">Loading...</span></div><div className="spinner-grow text-dark" role="status"><span className="sr-only">Loading...</span></div><div className="spinner-grow text-dark" role="status"><span className="sr-only">Loading...</span></div></div>);
}

function Error(){
	return(<div><h2>Ups! Ha habido algún problema al recoger los artículos.</h2></div>);
}