import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Wand2,
  Bot,
  TrendingUp,
  MessageSquare,
  User,
  PlusCircle
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useLanguage } from '../i18n/index.js';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>
          <span>{t.brand}</span>
        </Link>

        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                <ShoppingBag size={16} />
                <span>{t.nav.marketplace}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-product" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <PlusCircle size={16} />
                <span>{t.nav.smartCatalog}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-enhancer" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Wand2 size={16} />
                <span>{t.nav.enhancer}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/assistant" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Bot size={16} />
                <span>{t.nav.assistant}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/market-insights" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <TrendingUp size={16} />
                <span>{t.nav.insights}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/enquiries" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <MessageSquare size={16} />
                <span>{t.nav.enquiries}</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />

          <Link to="/artisan-profile" className="btn btn-secondary btn-sm" title="Artisan Studio">
            <User size={16} />
            <span>{t.nav.profile}</span>
          </Link>

          <Link to="/login" className="btn btn-primary btn-sm">
            <span>{t.nav.login}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
