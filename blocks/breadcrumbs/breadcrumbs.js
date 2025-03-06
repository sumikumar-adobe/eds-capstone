function createBreadcrumbIcon() {
  const icon = document.createElement('span');
  icon.classList.add('breadcrumb-icon');
  icon.innerHTML = '▶'; // You can replace this with any icon, e.g., FontAwesome icon
  return icon;
}

function createBreadcrumbItem(path, href) {
  const itemList = document.createElement('li');
  itemList.classList.add('breadcrumbs-items');

  const anchorTag = document.createElement('a');
  anchorTag.href = `/${href}`;
  anchorTag.textContent = path.replace(/[-/]/g, ' ');

  itemList.append(anchorTag);
  return itemList;
}
export default function decorate() {
  const pageUrl = window.location.pathname;
  const paths = pageUrl.split('/').filter(Boolean); // Filter out empty strings
  const currentPage = paths.pop(); // Get the last element directly

  const breadcrumbBlock = document.querySelector('.breadcrumbs');

  const breadcrumbsList = document.createElement('ul');
  breadcrumbsList.classList.add('breadcrumbs-list');

  paths.forEach((path, index) => {
    const itemList = createBreadcrumbItem(path, paths.slice(0, index + 1).join('/'));
    breadcrumbsList.append(itemList);

    // Insert icon between breadcrumb items
    if (index < paths.length - 1) {
      const icon = createBreadcrumbIcon();
      breadcrumbsList.append(icon);
    }
  });

  // Add the current page as the last breadcrumb item
  const currentPageItem = document.createElement('li');
  currentPageItem.classList.add('breadcrumbs-items');
  currentPageItem.textContent = currentPage.replace(/[-/]/g, ' ');
  breadcrumbsList.append(currentPageItem);

  // Insert icon before the current page item if there are paths
  if (paths.length > 0) {
    const icon = createBreadcrumbIcon();
    breadcrumbsList.insertBefore(icon, currentPageItem);
  }

  breadcrumbBlock.append(breadcrumbsList);
}
