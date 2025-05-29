const BandCampPlayer = ({ value }) => {
  
  const { url } = value;

  return (
    <div className='w-full richtext-embed'>
      { url && <iframe src={ url } width={ 450 } height={ 350 } /> }
    </div>
  );
};

export default BandCampPlayer;