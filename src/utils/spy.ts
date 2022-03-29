const isElementInViewport = (el: HTMLElement): boolean => {
  if (el) {
    const rect = el.getBoundingClientRect();

    return el.offsetParent !== null && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  }
  return true;
};

export default isElementInViewport;
