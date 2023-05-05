import { checkNumInputs } from './index.js';

export const changeModalState = (state) => {
  const windowsForms = document.querySelectorAll('.balcon_icons_img');
  const windowsWidth = document.querySelectorAll('#width');
  const windowsHeight = document.querySelectorAll('#height');
  const windowsType = document.querySelectorAll('#view_type');
  const windowsProfiles = document.querySelectorAll('.checkbox');

  checkNumInputs('#width');
  checkNumInputs('#height');

  const bindActionToElements = (event, element, property) => {
    element.forEach((window, i) => {
      window.addEventListener(event, () => {
        switch (window.nodeName) {
          case 'SPAN':
            state[property] = i;
            break;
          case 'INPUT':
            if (window.getAttribute('type') === 'checkbox') {
              i === 0
                ? (state[property] = 'Холодное')
                : (state[property] = 'Тёплое');
              element.forEach((box, j) => {
                box.checked = false;
                if (i == j) {
                  box.checked = true;
                }
              });
            } else {
              state[property] = window.value;
            }
            break;
          case 'SELECT':
            state[property] = window.value;
            break;
        }

        console.log(state);
      });
    });
  };

  bindActionToElements('click', windowsForms, 'form');
  bindActionToElements('input', windowsHeight, 'height');
  bindActionToElements('input', windowsWidth, 'width');
  bindActionToElements('change', windowsType, 'type');
  bindActionToElements('change', windowsProfiles, 'profile');
};
