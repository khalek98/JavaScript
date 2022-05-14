const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
          tabs = document.querySelectorAll(tabSelector),
          contents = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        contents.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(tab => {
            tab.childNodes.forEach(node => {
                if (node.nodeName === 'A') {
                    node.classList.remove(activeClass);
                } 
            })
        });
    }

    function showTabContent(i = 0) {
        contents[i].style.display = 'block';
        
        tabs[i].childNodes.forEach(node => {
            if (node.nodeName === 'A') {
                node.classList.add(activeClass);
            } 
        })
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target && 
            (target.classList.contains(tabSelector.replace(/\./, "")) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
                tabs.forEach((item, i) => {
                    if (target === item || target.parentNode === item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
    });
};

export default tabs;