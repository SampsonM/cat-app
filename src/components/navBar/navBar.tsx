import React from 'react'
import { Link } from 'react-router-dom'

import './NavBar.css'

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}: NavBarProps) => {
  return (
    <nav data-testid="cat-nav" className="cat-nav">
      <ul className="cat-nav__list">
        <li className="cat-nav__list-item">
          <Link className="cat-nav__link" to="/upload">
            Upload
          </Link>
        </li>
        <li className="cat-nav__list-item">
          <Link className="cat-nav__link" to="/">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
