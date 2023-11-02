const splitText = (element) => {
  const text = element.textContent.trim().split(/\s/).filter((word)=> word !== '');
  const content = text.reduce((fragmentParent, word) => {
    const wordContainer = document.createElement('span');
    wordContainer.classList.add('word');
    wordContainer.innerHTML = word;
    fragmentParent.appendChild(wordContainer);
    fragmentParent.append(' ');
    return fragmentParent;
  }, document.createDocumentFragment());

  element.innerHTML = '';
  element.appendChild(content);
}

export {splitText}
