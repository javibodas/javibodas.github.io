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
    		let post = '<p>El objetivo de este post es mostrar los <label class=\"step\">pasos</label> a seguir para crear una <b><a href=\"https://www.miethereum.com/smart-contracts/dapps/\">DAPP (Aplicación Descentralizada)</a></b>.La aplicación de ejemplo que se va a mostrar permitirá generar y gestionar contratos de servicios móviles desde el navegador. Para ello utilizaremos las herramientas: <b><a href=\"https://www.trufflesuite.com/\">Truffle Suite</a></b> con la que podremos crear y hacer uso de <a href=\"https://www.miethereum.com/smart-contracts/\">contratos inteligentes</a> a través de <b><a href=\"https://ethereum.org/\">Ethereum</a></b>; y <b><a href=\"https://metamask.io/\">MetaMask</a></b> para realizarlo desde el navegador. El sistema operativo que se va a utilizar en este ejemplo es <b><a href=\"https://ubuntu.com/download/desktop\">Ubuntu 18.04</a></b>. </p>';
			return(<div dangerouslySetInnerHTML={{__html: post}}></div>);
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