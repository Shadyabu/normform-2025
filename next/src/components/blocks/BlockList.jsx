export default function ListBlock(props) {
  const { children, value } = props;

  if (value.listItem === 'bullet') {
    return <ul className="">{ children }</ul>;
  }

  if (value.listItem === 'number') {
    return <ol className="">{ children }</ol>;
  }

  return null;
}
