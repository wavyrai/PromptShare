'use client';

import { Libre_Franklin as LibreFranklin } from 'next/font/google';
import { useServerInsertedHTML } from 'next/navigation';

const sans = LibreFranklin({
  subsets: ['latin'],
  variable: '--font-family-sans',
  preload: true,
  weight: ['300', '400', '500', '600', '700', '800'],
});



// replace with a heading font
// by default, it will use the sans font
const heading = sans;

function Fonts() {
  useServerInsertedHTML(() => {
    return (
      <style
        key={'fonts'}
        dangerouslySetInnerHTML={{
          __html: `
          :root {
             --font-family-sans:   ${sans.style.fontFamily}, '-apple-system', 'BlinkMacSystemFont',
              'Segoe UI', 'Roboto', 'Ubuntu',
              'sans-serif';

            --font-family-heading: ${heading.style.fontFamily},  '-apple-system', 'BlinkMacSystemFont';
              
          }
        `,
        }}
      />
    );
  });

  return null;
}

export default Fonts;
