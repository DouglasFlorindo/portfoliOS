import WindowsManager from "/dist/windowsManager.js"

export function init(portfolioWindow) {
    const popUpImages = portfolioWindow.querySelectorAll("[element-role='popup-image']")

    if (popUpImages) popUpImages.forEach(element => {
        element.addEventListener("click", async () => {
            const title = element.getAttribute("image-title") || ""

            const imgEl = element.querySelector(`img[title="${title}"]`)
            if (!imgEl) return;

            const src = imgEl.getAttribute("src") || "";
            const alt = imgEl.getAttribute("alt") || "";

            await newImagePopUp(src, alt, title)
        })
    });

    async function newImagePopUp(imageSrc, imageAlt, popUpTitle) {
        const imgElHTML = `<figure class="popup-figure"><img src="${imageSrc}" alt="${imageAlt}"></figure>`;

        await WindowsManager.newPopUp(imgElHTML, popUpTitle)
    }
}

