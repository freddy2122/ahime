import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Package, Upload, X, Plus, Save } from 'lucide-react'

const AdminProductsNew = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    promoPrice: '',
    category: '',
    stock: '',
    isOnSale: false,
    rating: '',
    image: '',
    images: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
  })

  const [newImage, setNewImage] = useState('')
  const [newColor, setNewColor] = useState('')
  const [newSize, setNewSize] = useState('')

  const categories = [
    { value: 'electronique', label: 'Électronique' },
    { value: 'mode-vetements', label: 'Mode & Vêtements' },
    { value: 'maison-decoration', label: 'Maison & Décoration' },
    { value: 'beaute-sante', label: 'Beauté & Santé' },
    { value: 'alimentation', label: 'Alimentation' },
    { value: 'sport-loisirs', label: 'Sport & Loisirs' },
  ]

  const colorOptions = ['Noir', 'Blanc', 'Rouge', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Violet', 'Rose', 'Gris', 'Beige', 'Marron']
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  const handleAddImage = () => {
    if (newImage.trim()) {
      if (!formData.images.includes(newImage)) {
        setFormData({ ...formData, images: [...formData.images, newImage] })
      }
      setNewImage('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    })
  }

  const handleAddColor = (color: string) => {
    if (!formData.colors.includes(color)) {
      setFormData({ ...formData, colors: [...formData.colors, color] })
    }
  }

  const handleAddCustomColor = () => {
    if (newColor.trim() && !formData.colors.includes(newColor)) {
      setFormData({ ...formData, colors: [...formData.colors, newColor] })
      setNewColor('')
    }
  }

  const handleRemoveColor = (color: string) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter(c => c !== color)
    })
  }

  const handleAddSize = (size: string) => {
    if (!formData.sizes.includes(size)) {
      setFormData({ ...formData, sizes: [...formData.sizes, size] })
    }
  }

  const handleRemoveSize = (size: string) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter(s => s !== size)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Envoyer à Supabase
    console.log('Produit à créer:', formData)
    alert('Produit créé avec succès!')
    navigate('/admin/products')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
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
                <Package className="w-8 h-8 mr-3" />
                Ajouter un produit
              </h1>
              <p className="text-gray-600">
                Remplissez tous les champs pour créer un nouveau produit
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
                    Nom du produit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Laptop HP Pavilion 15"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez le produit en détail..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Catégorie <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock disponible <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Prix */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Prix</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prix normal (XOF) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prix promotionnel (XOF)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={formData.promoPrice}
                    onChange={(e) => setFormData({ ...formData, promoPrice: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isOnSale"
                  checked={formData.isOnSale}
                  onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isOnSale" className="text-sm font-semibold text-gray-700">
                  Activer la promotion (nécessite un prix promotionnel)
                </label>
              </div>
            </div>

            {/* Images */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Images</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image principale (URL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Aperçu"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23e5e7eb" width="128" height="128"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="12" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Images supplémentaires (URL)
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="url"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="https://example.com/image2.jpg"
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddImage()
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter</span>
                    </button>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="10" fill="%239ca3af"%3EImage%3C/text%3E%3C/svg%3E'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Couleurs */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Couleurs disponibles</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleAddColor(color)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold border-2 transition-colors ${
                        formData.colors.includes(color)
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Ou ajouter une couleur personnalisée"
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddCustomColor()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomColor}
                    className="btn-secondary"
                  >
                    Ajouter
                  </button>
                </div>

                {formData.colors.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Couleurs sélectionnées:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.colors.map(color => (
                        <span
                          key={color}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold flex items-center space-x-2"
                        >
                          <span>{color}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(color)}
                            className="text-primary-700 hover:text-primary-900"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tailles */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Tailles disponibles</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleAddSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                        formData.sizes.includes(size)
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {formData.sizes.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Tailles sélectionnées:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.sizes.map(size => (
                        <span
                          key={size}
                          className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-semibold flex items-center space-x-2"
                        >
                          <span>{size}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSize(size)}
                            className="text-primary-700 hover:text-primary-900"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Note */}
            <div className="pt-6 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Note (sur 5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="4.5"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              />
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
                <span>Enregistrer le produit</span>
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  )
}

export default AdminProductsNew
