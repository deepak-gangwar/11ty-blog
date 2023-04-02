// convert all inline anchors to hoverable links with animation

if (window.location.href.toString().includes('post')) {
  const postContent = document.querySelector('.post__content');
  const anchors = postContent.querySelectorAll('a');

  anchors.forEach((link) => {
    // 👇 For the maggie appleton effect on anchors

    // let linkText = link.innerHTML
    // const linkSpan = document.createElement('span')
    // linkSpan.classList.add('underline__span')
    // linkSpan.innerHTML = linkText
    // link.classList.add('underline__link')
    // link.removeChild(link.firstChild)
    // link.appendChild(linkSpan)

    // 👇 For james clear effect on anchors
    link.classList.add('highlighter');
  });
}

// Make all headings as links and create the onpage component

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

if (window.location.href.toString().includes('post')) {
  const headings = document.querySelectorAll('h3');
  const onpageContainer = document.querySelector('.onpage__list');

  headings.forEach((heading) => {
    let headingText = heading.textContent;
    let headingID = slugify(headingText);
    heading.setAttribute('id', headingID);

    const headingAnchor = document.createElement('a');
    headingAnchor.href = window.location.href + `#${headingID}`;
    headingAnchor.textContent = headingText;
    headingAnchor.className = 'section-direct-links';
    heading.removeChild(heading.firstChild);
    heading.appendChild(headingAnchor);

    const onpageLink = document.createElement('a');
    onpageLink.classList.add('onpage__link');
    // onpageLink.innerText = headingText

    const span = document.createElement('span');
    span.innerText = headingText;
    onpageLink.appendChild(span);
    onpageLink.href = `#${headingID}`;

    const li = document.createElement('li');
    li.className = 'onpage__item';
    li.appendChild(onpageLink);

    // onpageContainer.appendChild(onpageLink)
    onpageContainer.appendChild(li);
  });
}
