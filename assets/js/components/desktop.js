'use strict';

class DesktopVersion extends React.Component{

	constructor(props){
		super(props);
		this.state = { error: null, isLoadedTree: false, isLoadedArtDef: false, articlesTreeList : [], defaultArticle: {} }
	}

	componentDidMount(){
		fetch('https://api-bodblog.herokuapp.com/articles/home-default')
      	.then(res => res.json())
      	.then(
	        (result) => {
	          this.setState({
	            isLoadedArtDef: true,
	            defaultArticle: result
	          });
	        },
	        (error) => {
	          this.setState({
	            isLoadedArtDef: false,
	            error
	          });
	        }
      	);

      	fetch('https://api-bodblog.herokuapp.com/articles/tree')
    	.then(res => res.json())
	    .then(
	      (result) => {
	        this.setState({
	          isLoadedTree: true,
	          articlesTreeList: result
	        });
	      },
	      (error) => {
	        this.setState({
	          isLoadedTree: false,
	          error
	        });
	      }
	    );

	}

	handleClickArticle(id){
		fetch('https://api-bodblog.herokuapp.com/articles/' + id)
    	.then(res => res.json())
	    .then(
	      (result) => {
	        this.setState({
	          isLoadedArtDef: true,
	          defaultArticle: result
	        });
	      },
	      (error) => {
	        this.setState({
	          isLoadedArtDef: false,
	          error
	        });
	      }
	    );
	}

	render(){
		const { error, isLoadedTree, isLoadedArtDef, articlesTreeList, defaultPost } = this.state;

		if (error) {
      		return <Error />;
    	} else if (!isLoadedTree || !isLoadedArtDef) {
      		return <Loading />;
      	}else{
			return(<div class="row desktop">
						<div class="col-lg-9 col-12"><Post post={defaultPost}/></div>
						<div class="col-lg-3 col-12 right-bar"><Articles articles={articlesTreeList} clickArticle={this.handleClickArticle}/></div>
				</div>);
		}
	}
}

function Loading(){
	return(<div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div></div>);
}

function Error(){
	return(<div><h2>Ups! Ha habido algún problema al recoger los artículos.</h2></div>);
}