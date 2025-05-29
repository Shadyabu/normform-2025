import MenuButtonBar from './MenuButtonBar';

const MenuButton = ({ activeDropdown, setActiveDropdown }) => {

  return (
    <button
      onClick={ () => {
        if (activeDropdown) {
          setActiveDropdown(null);
        } else {
          setActiveDropdown('menu');
        }
      } }
      className='block'
    >
      <div className={ `w-6 h-4 relative flex flex-col justify-between items-center transition-rotate duration-[400ms] ${ activeDropdown ? 'rotate-45' : '' }` }>
        <div className={ `relative transition-[top,transform] duration-[400ms] ${ activeDropdown ? 'top-2 -translate-y-1/2' : 'top-0' }` }>
          <MenuButtonBar />
        </div>
        <div className={ `relative transition-rotate duration-[400ms] origin-center ${ activeDropdown ? 'rotate-90' : '' }` }>
          <MenuButtonBar />
        </div>
        <div className={ `relative transition-[bottom,transform] duration-[400ms] ${ activeDropdown ? 'bottom-2 translate-y-1/2' : 'bottom-0' }` }>
          <MenuButtonBar />
        </div>
      </div>
    </button>
  );
};

export default MenuButton;