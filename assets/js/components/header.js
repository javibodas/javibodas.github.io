'use strict';

function Header(){
	return (<nav className="navbar navbar-expand-lg navbar-dark" ><React.Fragment><ButtonHome/><Navigation/></React.Fragment></nav>)
}

function ButtonHome(){
	return (<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
			</button>)
}

function Navigation(){

	return(<div id="navigation" className="collapse navbar-collapse flex-column" ><React.Fragment><ProfileSection/><NavigationBar/></React.Fragment></div>)
}

function ProfileSection(){
	return (<div className="profile-section pt-3 pt-lg-0"><React.Fragment><BlogDescription/><SocialList/></React.Fragment></div>)
}

function BlogDescription(){
	return React.createElement("div", {
  			className: "bio mb-3"
			}, "Hola mi nombre es Javier, soy Desarrollador de Software y te doy la bienvenida a mi blog personal.")
}

function SocialList(){
	return (<ul className="social-list list-inline py-3 mx-auto">
			            <li className="list-inline-item"><a href="https://twitter.com/BodasJavier"><i className="fab fa-twitter fa-fw"></i></a></li>
			            <li className="list-inline-item"><a href="https://www.linkedin.com/in/javier-gonz%C3%A1lez-bodas-70a59787/"><i className="fab fa-linkedin-in fa-fw"></i></a></li>
			            <li className="list-inline-item"><a href="https://github.com/javibodas"><i className="fab fa-github-alt fa-fw"></i></a></li>
			            <li className="list-inline-item"><a href="mailto:gonzalezbodasjavier@yahoo.es"><i className="fas fa-envelope fa-fw"></i></a></li>
			        </ul>)
}

function NavigationBar(){
	return (<ul className="navbar-nav flex-column text-left">
				<React.Fragment>
					<NavigationBarItem link='/index.html' text='Blog Home'/>
					<NavigationBarItem link='/portafolio.html' text='Portafolio'/>
				</React.Fragment>
			</ul>)
}

function NavigationBarItem(props){
	if(window.location.href.endsWith(props.link)){
		return (<li className="nav-item active">
					    <a className="nav-link" href={props.link}><i className="fas fa-home fa-fw mr-2"></i>{props.text} <span className="sr-only">(current)</span></a>
					</li>)
	}else{
		return (<li className="nav-item">
					    <a className="nav-link" href={props.link}><i className="fas fa-home fa-fw mr-2"></i>{props.text}</a>
					</li>)
	}
}


ReactDOM.render(<Header/>, document.querySelector('.header'));