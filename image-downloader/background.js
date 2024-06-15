chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "downloadImages",
      title: "Download Images",
      contexts: ["all"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "downloadImages") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: downloadImages
      });
    }
  });
  
  function downloadImages() {
    const images = Array.from(document.querySelectorAll('img')).map(img => img.src);
    images.forEach((src, index) => {
      fetch(src)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `image${index + 1}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
    });
  }
  