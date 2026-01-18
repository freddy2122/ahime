import { Share2, Facebook, Twitter, WhatsApp, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface ShareButtonsProps {
  url?: string
  title?: string
  description?: string
  image?: string
  className?: string
}

const ShareButtons = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Découvrez ce produit sur Ahimè',
  description = 'Venez voir ce produit incroyable !',
  image = '',
  className = '',
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false)

  const shareUrl = url
  const shareText = `${title} - ${description}`

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)

    let shareLink = ''

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
        break
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        break
      default:
        return
    }

    // Open in new window
    window.open(shareLink, '_blank', 'width=600,height=400')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Lien copié !')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Erreur lors de la copie')
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-gray-600 mr-2">Partager :</span>
      <button
        onClick={() => handleShare('facebook')}
        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
        aria-label="Partager sur Facebook"
      >
        <Facebook className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
        aria-label="Partager sur Twitter"
      >
        <Twitter className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleShare('whatsapp')}
        className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
        aria-label="Partager sur WhatsApp"
      >
        <WhatsApp className="w-5 h-5" />
      </button>
      <button
        onClick={handleCopy}
        className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center transition-colors"
        aria-label="Copier le lien"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
      
      {/* Native Share API pour mobile */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={async () => {
            try {
              await navigator.share({
                title,
                text: description,
                url: shareUrl,
              })
            } catch (error) {
              // User cancelled or error
            }
          }}
          className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors"
          aria-label="Partager"
        >
          <Share2 className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export default ShareButtons
