import SpanClickable from './treeSpanClickableComponent'

function Year(props){
  return(<li><SpanClickable open={props.active} text={props.year} elements={props.months}/></li>);
}

export default Year;