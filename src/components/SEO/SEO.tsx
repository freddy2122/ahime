import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  productPrice?: string
  productCurrency?: string
  productAvailability?: 'in stock' | 'out of stock' | 'preorder'
  productCondition?: 'new' | 'used' | 'refurbished'
  organizationName?: string
  organizationLogo?: string
  canonicalUrl?: string
  noindex?: boolean
  nofollow?: boolean
}

const SEO = ({
  title = 'Ahimè - Votre marché en ligne au Bénin',
  description = 'Achetez tous vos produits en ligne au Bénin. Électronique, mode, maison, beauté et plus encore. Livraison rapide et sécurisée partout au Bénin.',
  keywords = 'e-commerce bénin, shopping en ligne bénin, produits bénin, livraison bénin, ahimè, boutique en ligne',
  image = 'https://ahimey.vercel.app/logo/logo-colored.svg',
  url = 'https://ahimey.vercel.app',
  type = 'website',
  productPrice,
  productCurrency = 'XOF',
  productAvailability = 'in stock',
  productCondition = 'new',
  organizationName = 'Ahimè',
  organizationLogo = 'https://ahimey.vercel.app/logo/logo-colored.svg',
  canonicalUrl,
  noindex = false,
  nofollow = false,
}: SEOProps) => {
  const fullTitle = title.includes('Ahimè') ? title : `${title} | Ahimè`
  const fullUrl = canonicalUrl || url
  const fullImage = image.startsWith('http') ? image : `${url}${image}`

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', organizationName)
    updateMetaTag('robots', `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`)

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:image', fullImage, 'property')
    updateMetaTag('og:url', fullUrl, 'property')
    updateMetaTag('og:type', type, 'property')
    updateMetaTag('og:site_name', organizationName, 'property')
    updateMetaTag('og:locale', 'fr_FR', 'property')

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', fullImage)

    // Product-specific tags
    if (type === 'product') {
      updateMetaTag('product:price:amount', productPrice || '', 'property')
      updateMetaTag('product:price:currency', productCurrency, 'property')
      updateMetaTag('product:availability', productAvailability, 'property')
      updateMetaTag('product:condition', productCondition, 'property')
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', fullUrl)

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'product' ? 'Product' : 'WebSite',
      name: fullTitle,
      description: description,
      url: fullUrl,
      ...(type === 'product' && {
        image: fullImage,
        offers: {
          '@type': 'Offer',
          price: productPrice || '0',
          priceCurrency: productCurrency,
          availability: `https://schema.org/${productAvailability === 'in stock' ? 'InStock' : 'OutOfStock'}`,
          itemCondition: `https://schema.org/${productCondition === 'new' ? 'NewCondition' : 'UsedCondition'}`,
        },
      }),
      ...(type === 'website' && {
        publisher: {
          '@type': 'Organization',
          name: organizationName,
          logo: {
            '@type': 'ImageObject',
            url: organizationLogo,
          },
        },
      }),
    }

    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new structured data script
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }, [
    fullTitle,
    description,
    keywords,
    fullImage,
    fullUrl,
    type,
    productPrice,
    productCurrency,
    productAvailability,
    productCondition,
    organizationName,
    organizationLogo,
    noindex,
    nofollow,
  ])

  return null
}

export default SEO
