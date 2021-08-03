import React from 'react'
import { Link } from 'react-router-dom'

import './NavBar.css'

interface NavBarProps { }

const NavBar: React.FC<NavBarProps> = ({ }: NavBarProps) => {
	return (
		<nav data-testid="cat-nav" className="cat-nav">
			<ul>
				<li>
					<Link to="/upload">Upload</Link>
				</li>
			</ul>
		</nav>
	)
};

export default NavBar
