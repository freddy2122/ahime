import { useState } from 'react'
import { motion } from 'framer-motion'
import { Folder, X, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminAddCategory = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentCategory: '',
    image: '',
    imageFile: null as File | null,
    order: '',
    status: 'active',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
  })

  const [imagePreview, setImagePreview] = useState<string>('')

  const parentCategories = [
    { value: '', label: 'Catégorie principale (aucune)' },
    { value: 'electronique', label: 'Électronique' },
    { value: 'mode-vetements', label: 'Mode & Vêtements' },
    { value: 'maison-decoration', label: 'Maison & Décoration' },
    { value: 'beaute-sante', label: 'Beauté & Santé' },
    { value: 'alimentation', label: 'Alimentation' },
    { value: 'sport-loisirs', label: 'Sport & Loisirs' },
  ]

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name, slug: generateSlug(name) })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, imageFile: file })
      const preview = URL.createObjectURL(file)
      setImagePreview(preview)
    }
  }

  const removeImage = () => {
    setFormData({ ...formData, image: '', imageFile: null })
    setImagePreview('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Envoyer les données à Supabase
    console.log('Category data:', formData)
    alert('Catégorie ajoutée avec succès!')
    navigate('/admin/products')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
                <Folder className="w-8 h-8 mr-3" />
                Ajouter une catégorie
              </h1>
              <p className="text-gray-600">
                Créez une nouvelle catégorie ou sous-catégorie pour organiser vos produits
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

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Informations de base */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Informations de base</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom de la catégorie *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    placeholder="Ex: Smartphones, Vêtements Femme..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL) *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    pattern="[a-z0-9-]+"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none font-mono text-sm"
                    placeholder="smartphones, vetements-femme..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Généré automatiquement à partir du nom. Utilisé dans l'URL de la catégorie.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    placeholder="Description de la catégorie..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie parente</label>
                    <select
                      value={formData.parentCategory}
                      onChange={(e) => setFormData({ ...formData, parentCategory: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    >
                      {parentCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Laissez vide pour créer une catégorie principale
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ordre d'affichage</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                      min="0"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Plus le nombre est petit, plus la catégorie apparaît en premier
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Statut *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Image de la catégorie</h2>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Cliquez pour télécharger une image</p>
                    <label className="btn-secondary inline-flex items-center space-x-2 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Choisir une image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG, WEBP. Recommandé: 400x400px</p>
                  </div>
                )}

                {!imagePreview && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ou entrez une URL d'image</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                      placeholder="https://exemple.com/image.jpg"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* SEO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">SEO (Optimisation pour les moteurs de recherche)</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    maxLength={60}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    placeholder="Titre pour les moteurs de recherche (max 60 caractères)"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/60</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    rows={3}
                    maxLength={160}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    placeholder="Description pour les moteurs de recherche (max 160 caractères)"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Keywords</label>
                  <input
                    type="text"
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    placeholder="mot-clé1, mot-clé2, mot-clé3..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Boutons d'action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-end space-x-4 pt-6"
            >
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
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminAddCategory
