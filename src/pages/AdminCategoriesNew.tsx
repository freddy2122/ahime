import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FolderPlus, Upload, X, Save } from 'lucide-react'

const AdminCategoriesNew = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    icon: '',
    parentCategory: '',
    isActive: true,
    order: 0,
  })

  const [previewImage, setPreviewImage] = useState('')

  const parentCategories = [
    { value: '', label: 'Catégorie principale' },
    { value: 'electronique', label: 'Électronique' },
    { value: 'mode-vetements', label: 'Mode & Vêtements' },
    { value: 'maison-decoration', label: 'Maison & Décoration' },
    { value: 'beaute-sante', label: 'Beauté & Santé' },
    { value: 'alimentation', label: 'Alimentation' },
    { value: 'sport-loisirs', label: 'Sport & Loisirs' },
  ]

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    })
  }

  const handleImageChange = (url: string) => {
    setFormData({ ...formData, image: url })
    setPreviewImage(url)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Envoyer à Supabase
    console.log('Catégorie à créer:', formData)
    alert('Catégorie créée avec succès!')
    navigate('/admin/products')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
                <FolderPlus className="w-8 h-8 mr-3" />
                Ajouter une catégorie
              </h1>
              <p className="text-gray-600">
                Créez une nouvelle catégorie pour organiser vos produits
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/products')}
              className="btn-secondary"
            >
              Annuler
            </button>
          </div>
        </motion.div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 space-y-6"
          >
            {/* Informations de base */}
            <div>
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Informations de base</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom de la catégorie <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ex: Électronique, Mode, Maison..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Le slug sera généré automatiquement : {formData.slug || '(vide)'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug (URL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="electronique"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Utilisé dans l'URL. Doit être unique et en minuscules avec des tirets
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez cette catégorie..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Catégorie parente
                    </label>
                    <select
                      value={formData.parentCategory}
                      onChange={(e) => setFormData({ ...formData, parentCategory: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    >
                      {parentCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ordre d'affichage
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Plus le nombre est petit, plus la catégorie apparaît en haut
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Image de la catégorie</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleImageChange(e.target.value)}
                    placeholder="https://example.com/category-image.jpg"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                {previewImage && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Aperçu de l'image:</p>
                    <div className="relative w-full max-w-md">
                      <img
                        src={previewImage}
                        alt="Aperçu catégorie"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23e5e7eb" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, image: '' })
                          setPreviewImage('')
                        }}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Icône (nom de classe ou emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Ex: 📱 ou nom de classe CSS"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Utilisez un emoji ou le nom d'une classe d'icône
                  </p>
                </div>
              </div>
            </div>

            {/* Statut */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                  Catégorie active (visible sur le site)
                </label>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="pt-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="btn-secondary"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Enregistrer la catégorie</span>
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  )
}

export default AdminCategoriesNew
