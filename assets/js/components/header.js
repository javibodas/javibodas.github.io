'use strict';

function Header(){
	return (<nav class="navbar navbar-expand-lg navbar-dark" ><React.Fragment><ButtonHome/><Navigation/></React.Fragment></nav>);
}

function ButtonHome(){
	return (<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
			</button>);
}

function Navigation(){

	return(<div id="navigation" class="collapse navbar-collapse flex-column" ><React.Fragment><ProfileSection/><NavigationBar/></React.Fragment></div>)
}

function ProfileSection(){
	return (<div class="profile-section pt-3 pt-lg-0"><React.Fragment><ProfileImage/><BlogDescription/><SocialList/></React.Fragment></div>)
}

function ProfileImage(){
	return (<img class="profile-image mb-3 rounded-circle mx-auto" src="/assets/images/profile.png" alt="image" >);
}

function BlogDescription(){
	return (<div class="bio mb-3">Hola mi nombre es Javier, soy Desarrollador de Software y te doy la bienvenida a mi blog personal.<br></div>);
}

function SocialList(){
	return (<ul class="social-list list-inline py-3 mx-auto">
			            <li class="list-inline-item"><a href="https://twitter.com/BodasJavier"><i class="fab fa-twitter fa-fw"></i></a></li>
			            <li class="list-inline-item"><a href="https://www.linkedin.com/in/javier-gonz%C3%A1lez-bodas-70a59787/"><i class="fab fa-linkedin-in fa-fw"></i></a></li>
			            <li class="list-inline-item"><a href="https://github.com/javibodas"><i class="fab fa-github-alt fa-fw"></i></a></li>
			            <li class="list-inline-item"><a href="mailto:gonzalezbodasjavier@yahoo.es"><i class="fas fa-envelope fa-fw"></i></a></li>
			        </ul>);
}

function NavigationBar(){
	return (<ul class="navbar-nav flex-column text-left">
				<React.Fragment>
					<NavigationBarItem link='/index.html' text='Blog Home'/>
					<NavigationBarItem link='/portafolio.html' text='Portafolio'/>
				</React.Fragment>
			</ul>)
}

function NavigationBarItem(props){
	if(window.location.href.endsWith(props.link)){
		return (<li class="nav-item active">
					    <a class="nav-link" href={props.link}><i class="fas fa-home fa-fw mr-2"></i>{props.text} <span class="sr-only">(current)</span></a>
					</li>)
	}else{
		return (<li class="nav-item">
					    <a class="nav-link" href={props.link}><i class="fas fa-home fa-fw mr-2"></i>{props.text}</a>
					</li>)
	}
}


ReactDOM.render(<Header/>, document.querySelector('.header'));