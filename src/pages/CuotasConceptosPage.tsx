import { useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@components/Table'
import { FormComponent, FormField } from '@components/Form'
import { cuotasConceptosAPI } from '@services/api'
import { CuotaConcepto } from '../types'

const CuotasConceptosPage = () => {
  const [data, setData] = useState<CuotaConcepto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<CuotaConcepto> | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const response = await cuotasConceptosAPI.getAll()
      setData(response.data?.data || response.data || [])
    } catch (error) {
      console.error('Error loading cuotas conceptos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingId(null)
    setEditData(null)
    setShowForm(true)
  }

  const handleEdit = (row: CuotaConcepto) => {
    setEditingId(row.id_cuota_concepto)
    setEditData(row)
    setShowForm(true)
  }

  const handleDelete = async (row: CuotaConcepto) => {
    if (confirm(`¿Eliminar cuota?`)) {
      try {
        await cuotasConceptosAPI.delete(row.id_cuota_concepto)
        loadData()
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }
  }

  const handleSubmit = async (formData: any) => {
    try {
      if (editingId) {
        await cuotasConceptosAPI.update(editingId, formData)
      } else {
        await cuotasConceptosAPI.create(formData)
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
      name: 'id_jugador',
      label: 'ID Jugador',
      type: 'number',
      required: true,
    },
    {
      name: 'id_concepto',
      label: 'ID Concepto',
      type: 'number',
      required: true,
    },
    {
      name: 'anio',
      label: 'Año',
      type: 'number',
      required: true,
      placeholder: '2025',
    },
    {
      name: 'monto',
      label: 'Monto',
      type: 'number',
      required: true,
      placeholder: '0.00',
    },
    {
      name: 'pagado',
      label: 'Pagado',
      type: 'checkbox',
    },
    {
      name: 'fecha_pago',
      label: 'Fecha de Pago',
      type: 'date',
    },
  ]

  const columns: ColumnDef<CuotaConcepto>[] = [
    {
      accessorKey: 'cedula_jugador',
      header: 'Cédula',
    },
    {
      accessorKey: 'nombre_jugador',
      header: 'Jugador',
    },
    {
      accessorKey: 'nombre_concepto',
      header: 'Concepto',
    },
    {
      accessorKey: 'anio',
      header: 'Año',
    },
    {
      accessorKey: 'monto',
      header: 'Monto',
      cell: ({ row }) => `$${row.original.monto.toFixed(2)}`,
    },
    {
      accessorKey: 'pagado',
      header: 'Estado',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.original.pagado
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {row.original.pagado ? 'Pagado' : 'Pendiente'}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-vigia-green mb-2">
          Cuotas por Concepto
        </h1>
        <p className="text-gray-600">
          Administra las cuotas por concepto anual
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
          searchPlaceholder="Buscar cuota..."
        />
      </div>

      {showForm && (
        <FormComponent
          title={editingId ? 'Editar Cuota' : 'Nueva Cuota'}
          fields={formFields}
          initialData={editData || { pagado: false }}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          submitLabel={editingId ? 'Actualizar' : 'Crear'}
        />
      )}
    </div>
  )
}

export default CuotasConceptosPage
