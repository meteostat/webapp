export default function (url: string): Promise<HTMLScriptElement> {
  return new Promise((resolve) => {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.addEventListener(
      'load',
      () => {
        resolve(script);
      },
      {
        once: true
      }
    );
    script.src = url;
    head.appendChild(script);
  });
}
