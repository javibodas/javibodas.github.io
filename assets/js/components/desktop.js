'use strict';

class DesktopVersion extends React.Component{
	render() {
		return(<React.Fragment>
						<div class="col-lg-9 col-12"><Post /></div>
						<div class="col-lg-3 col-12 right-bar">
							<div class="px-3 p-md-5">
								<div class="section-inner">
									<div class="heading py-2"><h4>Articulos</h4></div>
									<ul class="article-list"><ArticlesTree /></ul>
								</div>
							</div>
						</div>
				<React.Fragment>);
	}
}


ReactDOM.render(<DesktopVersion/>, document.querySelector('.desktop'));