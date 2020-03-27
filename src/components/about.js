function About(props){
	return <div></div>
}

ReactDOM.render(<About/>, document.querySelector('body'));


document.addEventListener('DOMContentLoaded', (event) => {
   /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
    new GitHubCalendar("#github-graph", "javibodas");
    
    
    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    //GitHubActivity.feed({ username: "javibodas", selector: "#ghfeed" });
});