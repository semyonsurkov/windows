export const tabs = ({
  headerSelector,
  tabSelector,
  contentSelector,
  activeClass,
  display = 'block',
}) => {
  const header = document.querySelector(headerSelector);
  const tabs = document.querySelectorAll(tabSelector);
  const contents = document.querySelectorAll(contentSelector);

  const hideTabContent = () => {
    contents.forEach((content) => {
      content.style.display = 'none';
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  };

  const showTabContent = (i = 0) => {
    contents[i].style.display = display;
    tabs[i].classList.add(activeClass);
  };

  const switchTab = (i) => {
    hideTabContent();
    showTabContent(i);
  };

  hideTabContent();
  showTabContent();

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      switchTab(i);
    });
  });

  header.addEventListener('keydown', (e) => {
    const target = e.target;
    if (
      target &&
      (target.classList.contains(tabSelector.replace(/\./, '')) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, '')))
    ) {
      if (e.key === 'Enter') {
        tabs.forEach((tab, i) => {
          if (target == tab || target.parentNode == tab) {
            switchTab(i);
          }
        });
      }
    }
  });
};
