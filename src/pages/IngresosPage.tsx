import { useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@components/Table'
import { FormComponent, FormField } from '@components/Form'
import { ingresosAPI } from '@services/api'
import { Ingreso } from '../types'

const months = [
  { label: 'Enero', value: 1 },
  { label: 'Febrero', value: 2 },
  { label: 'Marzo', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Mayo', value: 5 },
  { label: 'Junio', value: 6 },
  { label: 'Julio', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Septiembre', value: 9 },
  { label: 'Octubre', value: 10 },
  { label: 'Noviembre', value: 11 },
  { label: 'Diciembre', value: 12 },
]

const IngresosPage = () => {
  const [data, setData] = useState<Ingreso[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<Ingreso> | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const response = await ingresosAPI.getAll()
      setData(response.data?.data || response.data || [])
    } catch (error) {
      console.error('Error loading ingresos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingId(null)
    setEditData(null)
    setShowForm(true)
  }

  const handleEdit = (row: Ingreso) => {
    setEditingId(row.id_ingreso)
    setEditData(row)
    setShowForm(true)
  }

  const handleDelete = async (row: Ingreso) => {
    if (confirm(`¿Eliminar ingreso?`)) {
      try {
        await ingresosAPI.delete(row.id_ingreso)
        loadData()
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }
  }

  const handleSubmit = async (formData: any) => {
    try {
      if (editingId) {
        await ingresosAPI.update(editingId, formData)
      } else {
        await ingresosAPI.create(formData)
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
      name: 'concepto',
      label: 'Concepto',
      type: 'text',
      required: true,
      placeholder: 'ej: Inscripción 2025',
    },
    {
      name: 'mes_deuda',
      label: 'Mes Deuda',
      type: 'number',
      placeholder: '0',
    },
    {
      name: 'fecha_pago',
      label: 'Fecha de Pago',
      type: 'date',
      required: true,
    },
    {
      name: 'id_forma_pago',
      label: 'ID Forma de Pago',
      type: 'number',
      required: true,
    },
    {
      name: 'monto_bsf',
      label: 'Monto (Bs)',
      type: 'number',
      placeholder: '0.00',
    },
    {
      name: 'monto_usd',
      label: 'Monto (USD)',
      type: 'number',
      placeholder: '0.00',
    },
    {
      name: 'tasa_cambio',
      label: 'Tasa de Cambio',
      type: 'number',
      placeholder: '1.00',
    },
    {
      name: 'referencia',
      label: 'Referencia de Pago',
      type: 'text',
      placeholder: 'ej: Ref. Banco XYZ',
    },
    {
      name: 'notas',
      label: 'Notas',
      type: 'textarea',
      placeholder: 'Observaciones adicionales',
    },
  ]

  const columns: ColumnDef<Ingreso>[] = [
    {
      accessorKey: 'id_jugador',
      header: 'ID Jugador',
    },
    {
      accessorKey: 'concepto',
      header: 'Concepto',
    },
    {
      accessorKey: 'fecha_pago',
      header: 'Fecha Pago',
      cell: ({ row }) => new Date(row.original.fecha_pago).toLocaleDateString(),
    },
    {
      accessorKey: 'monto_bsf',
      header: 'Monto Bs',
      cell: ({ row }) =>
        row.original.monto_bsf
          ? `Bs ${row.original.monto_bsf.toFixed(2)}`
          : '-',
    },
    {
      accessorKey: 'monto_usd',
      header: 'Monto USD',
      cell: ({ row }) =>
        row.original.monto_usd ? `$ ${row.original.monto_usd.toFixed(2)}` : '-',
    },
    {
      accessorKey: 'referencia',
      header: 'Referencia',
      cell: ({ row }) => row.original.referencia || '-',
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-vigia-green mb-2">
          Ingresos/Pagos
        </h1>
        <p className="text-gray-600">
          Registra y administra los pagos de los jugadores
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
          searchPlaceholder="Buscar ingreso..."
        />
      </div>

      {showForm && (
        <FormComponent
          title={editingId ? 'Editar Ingreso' : 'Nuevo Ingreso'}
          fields={formFields}
          initialData={editData || { mes_deuda: 0 }}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          submitLabel={editingId ? 'Actualizar' : 'Crear'}
        />
      )}
    </div>
  )
}

export default IngresosPage
