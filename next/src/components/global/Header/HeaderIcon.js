const HeaderIcon = ({ item, activeDropdown, setActiveDropdown }) => {

  return (
    <button
      className='block mouse:hover:opacity-50 transition-opacity cursor-pointer'
      onClick={ () => {
        if (activeDropdown !== item.name) {
          setActiveDropdown(item.name);
        } else {
          setActiveDropdown(null);
        }
      } }
    >
      <img
        src={ `/assets/icons/${ item.src }.png` }
        className='block w-auto h-5'
        alt={ item.alt }
      />
    </button>
  );
};

export default HeaderIcon;