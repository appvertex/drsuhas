import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Button - Design system button component.
 * Renders as <button>, <Link> (router), or <a> based on props.
 * All external links automatically get noopener noreferrer.
 *
 * @param {'primary'|'premium'|'secondary'|'outline'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {string}  to       - Renders as react-router <Link>
 * @param {string}  href     - Renders as <a> tag
 * @param {boolean} external - Opens href in new tab with noopener
 */
export const Button = ({
  variant = 'primary',
  size,
  to,
  href,
  external = false,
  className = '',
  children,
  ...props
}) => {
  const cls = ['btn', `btn-${variant}`, size && `btn-size-${size}`, className]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
};
