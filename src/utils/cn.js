/**
 * cn - Conditionally join class names.
 * Zero-dependency replacement for clsx/classnames.
 * @param {...(string|boolean|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
