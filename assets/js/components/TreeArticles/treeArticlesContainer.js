import Month from './treeMonthComponent'
import Year from './treeYearComponent'
import ArticleTitle from './treeArticleComponent'


class ArticlesTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          error: null,
          isLoaded: false,
          articles: []
    }; 
  }

  componentDidMount() {
    fetch('https://api-bodblog.herokuapp.com/articles/tree')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          articles: result
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

  createList() {
    let list = []; 
    let years_articles = this.state.articles;

    for(var y of years_articles){
        let months_html = [];
        let months_articles = y.months;        

        for(var m of months_articles){
            let articles_html = [];
            let articles_title = m.articles;
            
            for(var a of articles_title){
              articles_html.push(<ArticleTitle link={a.link} title={a.title}/>);
            }

          months_html.push(<Month month={m.month} artics={articles_html} active={m.active}/>);
        }

      list.push(<Year year={y.year} months={months_html} active={y.active}/>);
    }
    return list;
  }

  render() {
    return (this.createList());
  }
}

ReactDOM.render(<ArticlesTree/>, document.querySelector('.article-list'));