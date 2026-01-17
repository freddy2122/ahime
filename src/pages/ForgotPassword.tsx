import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Intégrer avec Supabase Auth pour réinitialiser le mot de passe
    // Pour l'instant, simulation
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast.success('Email de réinitialisation envoyé !')
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0 flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="font-heading text-3xl font-black text-primary-600 mb-4">
                Email envoyé !
              </h1>
              <p className="text-gray-600 mb-6">
                Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>. 
                Veuillez vérifier votre boîte de réception et suivre les instructions.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Si vous ne recevez pas l'email dans quelques minutes, vérifiez votre dossier spam.
              </p>
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full btn-primary text-center py-3"
                >
                  Retour à la connexion
                </Link>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="block w-full text-primary-600 hover:text-primary-700 font-semibold py-2"
                >
                  Réessayer avec un autre email
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0 flex items-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* En-tête */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                <Mail className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="font-heading text-3xl font-black text-primary-600 mb-2">
                Mot de passe oublié ?
              </h1>
              <p className="text-gray-600">
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
              >
                {isLoading ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Envoyer le lien de réinitialisation</span>
                  </>
                )}
              </button>
            </form>

            {/* Lien de retour */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour à la connexion</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
