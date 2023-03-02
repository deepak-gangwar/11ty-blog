// convert all inline anchors to hoverable links with animation

if(window.location.href.toString().includes("post")) {
    const postContent = document.querySelector('.post__content')
    const anchors = postContent.querySelectorAll('a')

    anchors.forEach(link => {
        // 👇 For the maggie appleton effect on anchors

        // const linkText = link.innerHTML
        // const linkSpan = document.createElement('span')
        // linkSpan.classList.add('underline__span')
        // linkSpan.innerHTML = linkText
        // link.classList.add('underline__link')
        // link.removeChild(link.firstChild)
        // link.appendChild(linkSpan)
        
        // 👇 For james clear effect on anchors
        link.classList.add('highlighter')
    })
}