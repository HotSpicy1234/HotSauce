document.addEventListener('DOMContentLoaded', function() {
  const copyBtn = document.querySelector('.copy-btn');
  
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const text = this.getAttribute('data-copy');
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          const handle = copyBtn.querySelector('.handle');
          const originalText = handle.textContent;
          
          handle.textContent = 'copied';
          handle.style.color = '#00ff00';
          
          setTimeout(function() {
            handle.textContent = originalText;
            handle.style.color = '';
          }, 1500);
        }).catch(function() {
          fallbackCopy(text);
        });
      } else {
        fallbackCopy(text);
      }
    });
  }
});

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    const copyBtn = document.querySelector('.copy-btn');
    const handle = copyBtn.querySelector('.handle');
    const originalText = handle.textContent;
    
    handle.textContent = 'copied';
    handle.style.color = '#00ff00';
    
    setTimeout(function() {
      handle.textContent = originalText;
      handle.style.color = '';
    }, 1500);
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }
  
  document.body.removeChild(textArea);
}