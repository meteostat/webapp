const isElementInViewport = (el: HTMLElement): boolean => {
  if (el) {
    const rect = el.getBoundingClientRect();

    return el.offsetParent !== null && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  }
  return true;
};

const scrollToElement = (id: string) => {
  const el = document?.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect()?.top + window?.pageYOffset - 78;
    window?.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  }
};

export { isElementInViewport, scrollToElement };
