class Blog extends React.Component{
	render(){
		return (<React.Fragment>
					<Header />
					<Main />
				</React.Fragment>)
	}
}

ReactDOM.render(<Blog/>, document.querySelector('body'));