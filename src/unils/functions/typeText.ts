export const typeText = (ref: any, speed?: number) => {
  const textElement = ref.current as HTMLElement;
  const text = textElement.textContent;
  let index = 0;

  const typingInterval = setInterval(() => {
    if (index <= text!.length) {
      textElement.textContent = text!.slice(0, index);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, speed || 100);

  return () => {
    clearInterval(typingInterval);
  };
};
