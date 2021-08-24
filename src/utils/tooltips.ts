const initTooltips = (bs: any) => {
  // Get all tooltip elements
  const tooltipList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  // Initialize all
  tooltipList.map((el: HTMLElement) => {
    // Dispose existing
    bs.Tooltip.getInstance(el)?.dispose()
    el.removeAttribute('data-bs-original-title')
    // Create new
    return new bs.Tooltip(el)
  })
}

export { initTooltips }