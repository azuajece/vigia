import { useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@components/Table'
import { FormComponent, FormField } from '@components/Form'
import { formasPagoAPI } from '@services/api'
import { FormaPago } from '../types'

const FormasPagoPage = () => {
  const [data, setData] = useState<FormaPago[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<FormaPago> | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const response = await formasPagoAPI.getAll()
      setData(response.data?.data || response.data || [])
    } catch (error) {
      console.error('Error loading formas pago:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingId(null)
    setEditData(null)
    setShowForm(true)
  }

  const handleEdit = (row: FormaPago) => {
    setEditingId(row.id_forma_pago)
    setEditData(row)
    setShowForm(true)
  }

  const handleDelete = async (row: FormaPago) => {
    if (confirm(`¿Eliminar forma de pago ${row.nombre_forma}?`)) {
      try {
        await formasPagoAPI.delete(row.id_forma_pago)
        loadData()
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }
  }

  const handleSubmit = async (formData: any) => {
    try {
      if (editingId) {
        await formasPagoAPI.update(editingId, formData)
      } else {
        await formasPagoAPI.create(formData)
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
      name: 'nombre_forma',
      label: 'Nombre de Forma de Pago',
      type: 'text',
      required: true,
      placeholder: 'ej: Transferencia Bancaria',
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Detalles de la forma de pago',
    },
    {
      name: 'activa',
      label: 'Activa',
      type: 'checkbox',
    },
  ]

  const columns: ColumnDef<FormaPago>[] = [
    {
      accessorKey: 'nombre_forma',
      header: 'Nombre',
    },
    {
      accessorKey: 'descripcion',
      header: 'Descripción',
      cell: ({ row }) => row.original.descripcion || '-',
    },
    {
      accessorKey: 'activa',
      header: 'Estado',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.original.activa
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.original.activa ? 'Activa' : 'Inactiva'}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-vigia-green mb-2">
          Formas de Pago
        </h1>
        <p className="text-gray-600">
          Administra los métodos de pago disponibles
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
          searchPlaceholder="Buscar forma de pago..."
        />
      </div>

      {showForm && (
        <FormComponent
          title={editingId ? 'Editar Forma de Pago' : 'Nueva Forma de Pago'}
          fields={formFields}
          initialData={editData || { activa: true }}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          submitLabel={editingId ? 'Actualizar' : 'Crear'}
        />
      )}
    </div>
  )
}

export default FormasPagoPage
