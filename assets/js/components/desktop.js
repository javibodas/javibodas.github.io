'use strict';

class DesktopVersion extends React.Component{

	constructor(props){
		this.state = { isLoadedTree: false, isLoadedDefaultAr: false, articlesTreeList : [], defaultArticle: {} }
	}

	componentDidMount(){
		fetch('https://api-bodblog.herokuapp.com/articles/home-default')
      	.then(res => res.json())
      	.then(
	        (result) => {
	          this.setState({
	            isLoadedDefaultAr: true,
	            articlesTreeList: result
	          });
	        },
	        (error) => {
	          this.setState({
	            isLoadedDefaultAr: true,
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
	          defaultArticle: result
	        });
	      },
	      (error) => {
	        this.setState({
	          isLoadedTree: true,
	          error
	        });
	      }
	    );

	}

	handleClickArticle(id){

	}

	render(){
		const { error, isLoadedTree, isLoadedDefaultAr, articlesTreeList, defaultPost } = this.state;

		if (error) {
      		return <Error />;
    	} else if (!isLoadedTree || !isLoadedDefaultAr) {
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