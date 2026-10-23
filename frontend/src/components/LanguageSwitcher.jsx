import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../i18n/index.js';

export default function LanguageSwitcher() {
  const { lang, setLang, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="lang-switcher" ref={dropdownRef}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
      >
        <Globe size={16} />
        <span>{currentLanguage.native}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`lang-option ${item.code === lang ? 'active' : ''}`}
              onClick={() => {
                setLang(item.code);
                setIsOpen(false);
              }}
            >
              <span>{item.native}</span>
              {item.code === lang && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
