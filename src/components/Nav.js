import colorLogo from '../images/color-logo-tinder.png'
import whiteLogo from '../images/tinder_logo_white.png'

const Nav = ({
  authToken,
  minimal,
  setShowModal,
  showModal
}) => {
  const handleClick = () => setShowModal(true)

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? colorLogo : whiteLogo} />
      </div>

      {
        !authToken && !minimal &&
          <button
            className='nav-button'
            onClick={handleClick}
            disabled={showModal}
          >
            Log In
          </button>
      }
    </nav>
  )
}

export default Nav
