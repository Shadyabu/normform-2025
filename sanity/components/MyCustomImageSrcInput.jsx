const MyCustomImageSrcInput = (props) => {
  const { value = '' } = props
  
  return (
    <div>
      <img src={ value } alt="My Custom Image" />
    </div>
  );
};

export default MyCustomImageSrcInput;