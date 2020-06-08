// Add the .compact class so we can toggle between compact and full (not yet implemented).
const adminBarPage = document.querySelector('.admin-bar__page');
adminBarPage.classList.add('compact');


// Add a smaller close button
const buttonGroup = document.querySelector('.admin-bar__button-group');
let listItem = document.createElement('li');
listItem.classList.add('ui-button-group__item');
listItem.innerHTML = `<button class="compact-exit-preview">&times;</button>`;
buttonGroup.appendChild(listItem);
listItem.addEventListener('click', e => window.location.href = `${window.location.origin}?preview_theme_id=`);
