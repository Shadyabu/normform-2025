import parse from 'html-react-parser';

const CustomEmbedModule = (props) => {

  const { embedCode } = props;

  if (embedCode && embedCode !== '') {
    return (
      <div className="module module--custom-embed">
        { parse(embedCode) }
      </div>
    );
  } else {
    return null;
  }
}

export default CustomEmbedModule;