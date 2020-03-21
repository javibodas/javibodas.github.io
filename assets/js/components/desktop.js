'use strict';

class DesktopVersion extends React.Component{
	render() {
		return(<React.Fragment>
						<div class="col-lg-9 col-12"><Post /></div>
						<div class="col-lg-3 col-12 right-bar"><Articles /></div>
				</React.Fragment>);
	}
}


ReactDOM.render(<DesktopVersion/>, document.querySelector('.desktop'));