import { useEffect } from 'react';

interface SEOMeta {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const SITE = 'SportsLife';
const DEFAULT_DESC = 'База упражнений, вики, питание, калькуляторы и сообщество для спортсменов';

function setMeta(name: string, content: string, isOG = false) {
  const attr  = isOG ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSEO({ title, description, keywords, ogImage }: SEOMeta = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : SITE;
    const desc = description ?? DEFAULT_DESC;

    document.title = fullTitle;
    setMeta('description', desc);
    if (keywords) setMeta('keywords', keywords);

    setMeta('og:title',       fullTitle,                    true);
    setMeta('og:description', desc,                         true);
    setMeta('og:type',        'website',                    true);
    if (ogImage) setMeta('og:image', ogImage,               true);

    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:title',       fullTitle);
    setMeta('twitter:description', desc);
  }, [title, description, keywords, ogImage]);
}
