import SpanClickable from './treeSpanClickableComponent'

function Month(props){
  return(<li><SpanClickable open={props.active} text={props.month} elements={props.artics}/></li>); 
}

export default Month;