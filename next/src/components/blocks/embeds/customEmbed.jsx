import parse from 'html-react-parser';

const CustomEmbedModule = (props) => {

  const { module } = props;

  if (module.value && module.value !== '') {
    return (
      <div className="module module--custom-embed">
        { parse(module.value) }
      </div>
    );
  } else {
    return null;
  }
}

export default CustomEmbedModule;