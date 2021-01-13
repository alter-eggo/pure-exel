export function capitalize(string) {
  if (typeof string !== "string") return "";

  return `${string.charAt(0).toLocaleUpperCase()}${string.slice(1)}`;
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === "object" && typeof b === "object") {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
}

export function camelToDashCase(string) {
  return string.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}

export function toInlineStyles(styles = {}) {
  return (
    Object.keys(styles)
      .map((style) => `${camelToDashCase(style)}: ${styles[style]}`)
      .join("; ") + ";"
  );
}

export function debounce(fn, wait) {
  let timeout;

  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      fn.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
