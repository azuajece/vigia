import { useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@components/Table'
import { FormComponent, FormField } from '@components/Form'
import { conceptosAPI } from '@services/api'
import { ConceptoCuota } from '../types'

const ConceptosPage = () => {
  const [data, setData] = useState<ConceptoCuota[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<ConceptoCuota> | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const response = await conceptosAPI.getAll()
      setData(response.data?.data || response.data || [])
    } catch (error) {
      console.error('Error loading conceptos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingId(null)
    setEditData(null)
    setShowForm(true)
  }

  const handleEdit = (row: ConceptoCuota) => {
    setEditingId(row.id_concepto)
    setEditData(row)
    setShowForm(true)
  }

  const handleDelete = async (row: ConceptoCuota) => {
    if (confirm(`¿Eliminar concepto ${row.nombre_concepto}?`)) {
      try {
        await conceptosAPI.delete(row.id_concepto)
        loadData()
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }
  }

  const handleSubmit = async (formData: any) => {
    try {
      if (editingId) {
        await conceptosAPI.update(editingId, formData)
      } else {
        await conceptosAPI.create(formData)
      }
      setShowForm(false)
      loadData()
    } catch (error) {
      console.error('Error saving:', error)
      throw error
    }
  }

  const formFields: FormField[] = [
    {
      name: 'nombre_concepto',
      label: 'Nombre Concepto',
      type: 'text',
      required: true,
      placeholder: 'ej: Inscripción',
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Detalles del concepto',
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { label: 'Inscripción', value: 'INSCRIPCION' },
        { label: 'Mensual', value: 'MENSUAL' },
        { label: 'Uniforme', value: 'UNIFORME' },
        { label: 'Torneo', value: 'TORNEO' },
        { label: 'Otro', value: 'OTRO' },
      ],
    },
    {
      name: 'activo',
      label: 'Activo',
      type: 'checkbox',
    },
  ]

  const columns: ColumnDef<ConceptoCuota>[] = [
    {
      accessorKey: 'nombre_concepto',
      header: 'Nombre',
    },
    {
      accessorKey: 'tipo',
      header: 'Tipo',
    },
    {
      accessorKey: 'descripcion',
      header: 'Descripción',
      cell: ({ row }) => row.original.descripcion || '-',
    },
    {
      accessorKey: 'activo',
      header: 'Estado',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.original.activo
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.original.activo ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-vigia-green mb-2">
          Conceptos de Cuota
        </h1>
        <p className="text-gray-600">
          Administra los conceptos de pago disponibles
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <DataTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          isLoading={isLoading}
          searchPlaceholder="Buscar concepto..."
        />
      </div>

      {showForm && (
        <FormComponent
          title={editingId ? 'Editar Concepto' : 'Nuevo Concepto'}
          fields={formFields}
          initialData={editData || { activo: true }}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          submitLabel={editingId ? 'Actualizar' : 'Crear'}
        />
      )}
    </div>
  )
}

export default ConceptosPage
