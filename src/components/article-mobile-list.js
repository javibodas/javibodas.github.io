class ArticleMobileList extends React.Component{

	createList() {
	    let list = [];
	    let articles = this.props.articles;

	    for(var i = 0; i < articles.length; i++){
	      list.push(<PostEntry title={articles[i].title} publication_date={articles[i].publication_time} description={articles[i].description} id={articles[i].id} handleClickPost={this.props.handleClickPost}/>);
	    }
	    return list;
	}

	render() {
		return(this.createList());
	}
}

function PostEntry(props){
	return(<div className="item mb-5"><div className="media"><div className="media-body"><h3 className="title mb-1"><a onClick={() => props.handleClickPost(props.id)}>{props.title}</a></h3><div className="meta mb-1"><span className="date">Publicado {props.publication_date}</span></div><div className="intro">{props.description}</div><a className="more-link" href={props.link}> Leer más &rarr;</a></div></div></div>);
}