import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg'

const Header = () => (
    <header>
        <img src={ logo } alt="Ecoleta" />

        <Link to="/">
            <FiArrowLeft />
            Voltar para home
        </Link>
    </header>
);

export default Header;
