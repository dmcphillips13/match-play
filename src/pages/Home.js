import { useState } from "react"

import AuthModal from "../components/AuthModal"
import Nav from "../components/Nav"

const Home = () => {
  const [showModal, setShowModal] = useState(false)

  const authToken = false

  const handleClick = () => {
    setShowModal(true)
  }

  return (
    <div className="overlay">
      <Nav
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <div className="home">
        <h1>Swipe Right®</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Sign Out" : "Create Account"}
        </button>

        {showModal && (
          <AuthModal setShowModal={setShowModal} />
        )}
      </div>
    </div>
  )
}

export default Home
