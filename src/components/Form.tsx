import React, { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

export interface FormConfig {
  title: string
  fields: FormField[]
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
  initialData?: any
  submitLabel?: string
  isLoading?: boolean
}

export interface FormField {
  name: string
  label: string
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'date'
    | 'select'
    | 'textarea'
    | 'checkbox'
  required?: boolean
  options?: Array<{ label: string; value: any }>
  placeholder?: string
  validation?: (value: any) => string | null
  disabled?: boolean
}

export const FormComponent: React.FC<FormConfig> = ({
  title,
  fields,
  onSubmit,
  onCancel,
  initialData = {},
  submitLabel = 'Guardar',
  isLoading = false,
}) => {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && !value) {
      return `${field.label} es requerido`
    }
    if (field.validation) {
      return field.validation(value)
    }
    return null
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target
    const actualValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prev: any) => ({
      ...prev,
      [name]: actualValue,
    }))

    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validate all fields
    fields.forEach((field) => {
      const error = validateField(field, formData[field.name])
      if (error) {
        newErrors[field.name] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setSubmitError(null)
      setSubmitSuccess(false)
      await onSubmit(formData)
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error: any) {
      setSubmitError(
        error.response?.data?.message || error.message || 'Error al guardar'
      )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold text-vigia-green mb-6">{title}</h2>

        {submitError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="text-red-600 w-5 h-5" />
            <span className="text-red-600">{submitError}</span>
          </div>
        )}

        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="text-green-600 w-5 h-5" />
            <span className="text-green-600">¡Guardado exitosamente!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  disabled={field.disabled || isLoading}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vigia-yellow ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                />
              ) : field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  disabled={field.disabled || isLoading}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vigia-yellow ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecciona una opción</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name] || false}
                  onChange={handleChange}
                  disabled={field.disabled || isLoading}
                  className="w-4 h-4 text-vigia-yellow rounded focus:ring-2 focus:ring-vigia-yellow"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  disabled={field.disabled || isLoading}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vigia-yellow ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              )}

              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-vigia-yellow text-vigia-green font-semibold rounded-lg hover:bg-yellow-400 disabled:opacity-50"
            >
              {isLoading ? 'Guardando...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
