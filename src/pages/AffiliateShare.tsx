import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Copy, Check, QrCode, Mail, MessageSquare, Link2, Download } from 'lucide-react'
import { toast } from 'react-hot-toast'
import ShareButtons from '../components/Share/ShareButtons'

const AffiliateShare = () => {
  const [copied, setCopied] = useState(false)

  const affiliateCode = 'AHIME123'
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ahimey.vercel.app'
  const affiliateUrl = `${baseUrl}/affiliate?ref=${affiliateCode}`
  const shareText = `Rejoignez le programme d'affiliation Ahimè et commencez à gagner jusqu'à 15% de commission sur chaque vente ! Code: ${affiliateCode}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      toast.success('Message copié !')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Erreur lors de la copie')
    }
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(affiliateCode)
      toast.success('Code copié !')
    } catch (error) {
      toast.error('Erreur lors de la copie')
    }
  }

  const templates = [
    {
      id: '1',
      title: 'Réseaux sociaux',
      content: `🎉 Rejoignez le programme d'affiliation Ahimè ! Gagnez jusqu'à 15% de commission en recommandant nos produits. Code: ${affiliateCode}\n\n${affiliateUrl}`,
      platform: 'social',
    },
    {
      id: '2',
      title: 'Email professionnel',
      content: `Bonjour,\n\nJe vous invite à rejoindre le programme d'affiliation d'Ahimè, votre marketplace en ligne au Bénin.\n\nEn tant que partenaire, vous pouvez gagner jusqu'à 15% de commission sur chaque vente générée via votre code d'affiliation.\n\nCode d'affiliation : ${affiliateCode}\nLien d'inscription : ${affiliateUrl}\n\nCordialement,`,
      platform: 'email',
    },
    {
      id: '3',
      title: 'Message WhatsApp',
      content: `Salut ! 👋\n\nJ'aimerais te partager une opportunité : le programme d'affiliation Ahimè. Tu peux gagner jusqu'à 15% de commission en partageant le lien !\n\nCode : ${affiliateCode}\nLien : ${affiliateUrl}\n\nIntéressé(e) ? 😊`,
      platform: 'whatsapp',
    },
  ]

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Modèle copié !')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
            <Share2 className="w-8 h-8 mr-3" />
            Partager le programme
          </h1>
          <p className="text-gray-600">
            Partagez le programme d'affiliation et invitez de nouveaux parrains
          </p>
        </motion.div>

        {/* Code d'affiliation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-white/80 text-sm mb-2">Votre code d'affiliation</p>
              <div className="flex items-center space-x-4">
                <p className="text-4xl font-black">{affiliateCode}</p>
                <button
                  onClick={handleCopyCode}
                  className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="Copier le code"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link2 className="w-5 h-5 text-white/80" />
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white text-sm underline"
              >
                Voir le lien
              </a>
            </div>
          </div>
        </motion.div>

        {/* Partage social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Partager sur les réseaux sociaux</h2>
          <ShareButtons
            url={affiliateUrl}
            title="Rejoignez le programme d'affiliation Ahimè"
            description={shareText}
          />
        </motion.div>

        {/* Modèles de messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Modèles de messages prêts à l'emploi</h2>
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border-2 border-gray-200 rounded-lg p-5 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {template.platform === 'social' && <Share2 className="w-5 h-5 text-gray-600" />}
                    {template.platform === 'email' && <Mail className="w-5 h-5 text-gray-600" />}
                    {template.platform === 'whatsapp' && <MessageSquare className="w-5 h-5 text-gray-600" />}
                    <h3 className="font-semibold text-gray-900">{template.title}</h3>
                  </div>
                  <button
                    onClick={() => handleCopyTemplate(template.content)}
                    className="btn-secondary text-sm flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copier</span>
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{template.content}</pre>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Message personnalisé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Créer un message personnalisé</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <textarea
              defaultValue={shareText}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none resize-none text-sm"
              placeholder="Tapez votre message personnalisé..."
            />
          </div>
          <button
            onClick={handleCopy}
            className="btn-primary flex items-center space-x-2"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? 'Copié !' : 'Copier le message'}</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default AffiliateShare
