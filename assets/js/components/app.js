class App extends React.Component{
	render(){
		return (<React.Fragment>
					<Header />
					<Main />
				</React.Fragment>)
	}
}

ReactDOM.render(<App/>, document.querySelector('body'));
