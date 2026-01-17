import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

const ChangePassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Les nouveaux mots de passe ne correspondent pas')
      return
    }

    if (formData.newPassword.length < 6) {
      toast.error('Le nouveau mot de passe doit contenir au moins 6 caractères')
      return
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error('Le nouveau mot de passe doit être différent de l\'ancien')
      return
    }

    setIsLoading(true)

    // TODO: Intégrer avec Supabase Auth pour changer le mot de passe
    // Pour l'instant, simulation
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      toast.success('Mot de passe modifié avec succès !')
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSuccess) {
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
                Mot de passe modifié !
              </h1>
              <p className="text-gray-600 mb-6">
                Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
              <div className="space-y-3">
                <Link
                  to="/account"
                  className="block w-full btn-primary text-center py-3"
                >
                  Retour au profil
                </Link>
                <Link
                  to="/login"
                  className="block w-full text-primary-600 hover:text-primary-700 font-semibold py-2"
                >
                  Se connecter
                </Link>
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
              <Link
                to="/account"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour au profil</span>
              </Link>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                <Lock className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="font-heading text-3xl font-black text-primary-600 mb-2">
                Changer le mot de passe
              </h1>
              <p className="text-gray-600">
                Entrez votre mot de passe actuel et choisissez un nouveau mot de passe sécurisé
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mot de passe actuel */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe actuel *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Nouveau mot de passe */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nouveau mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
              </div>

              {/* Confirmation nouveau mot de passe */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Indicateur de force du mot de passe */}
              {formData.newPassword && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Force du mot de passe :</p>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((level) => {
                      const strength = formData.newPassword.length >= 8 
                        ? (formData.newPassword.match(/[A-Z]/) ? 1 : 0) +
                          (formData.newPassword.match(/[a-z]/) ? 1 : 0) +
                          (formData.newPassword.match(/[0-9]/) ? 1 : 0) +
                          (formData.newPassword.match(/[^A-Za-z0-9]/) ? 1 : 0)
                        : Math.min(4, Math.floor(formData.newPassword.length / 2))
                      
                      const color = strength >= 3 ? 'bg-green-500' : strength >= 2 ? 'bg-yellow-500' : 'bg-red-500'
                      return (
                        <div
                          key={level}
                          className={`h-2 flex-1 rounded ${
                            level <= strength ? color : 'bg-gray-200'
                          }`}
                        />
                      )
                    })}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {formData.newPassword.length < 6 && 'Trop court'}
                    {formData.newPassword.length >= 6 && formData.newPassword.length < 8 && 'Faible'}
                    {formData.newPassword.length >= 8 && !formData.newPassword.match(/[A-Z]/) && 'Ajoutez une majuscule'}
                    {formData.newPassword.length >= 8 && formData.newPassword.match(/[A-Z]/) && !formData.newPassword.match(/[0-9]/) && 'Ajoutez un chiffre'}
                    {formData.newPassword.length >= 8 && formData.newPassword.match(/[A-Z]/) && formData.newPassword.match(/[0-9]/) && !formData.newPassword.match(/[^A-Za-z0-9]/) && 'Ajoutez un caractère spécial'}
                    {formData.newPassword.length >= 8 && formData.newPassword.match(/[A-Z]/) && formData.newPassword.match(/[0-9]/) && formData.newPassword.match(/[^A-Za-z0-9]/) && 'Fort'}
                  </p>
                </div>
              )}

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
              >
                {isLoading ? (
                  <span>Modification en cours...</span>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Modifier le mot de passe</span>
                  </>
                )}
              </button>
            </form>

            {/* Lien mot de passe oublié */}
            <div className="mt-6 text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
