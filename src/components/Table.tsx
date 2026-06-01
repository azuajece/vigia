import React, { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table'
import {
  ChevronUp,
  ChevronDown,
  Search,
  Trash2,
  Edit2,
  Plus,
} from 'lucide-react'

interface DataTableProps<T extends Record<string, any>> {
  columns: ColumnDef<T, any>[]
  data: T[]
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onCreate?: () => void
  isLoading?: boolean
  pageSize?: number
  searchPlaceholder?: string
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  (
    {
      columns,
      data,
      onEdit,
      onDelete,
      onCreate,
      isLoading = false,
      pageSize = 10,
      searchPlaceholder = 'Buscar...',
    },
    ref
  ) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    console.log('🎯 DataTable Props:', {
      dataLength: Array.isArray(data) ? data.length : 'NO ES ARRAY',
      columnsCount: columns?.length,
      isLoading,
      dataType: typeof data,
      firstRow: Array.isArray(data) && data.length > 0 ? data[0] : null,
    })

    const table = useReactTable({
      data: data || [],
      columns: useMemo(() => {
        const actionCol: ColumnDef<any> = {
          id: 'actions',
          header: 'Acciones',
          cell: ({ row }) => (
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(row.original)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(row.original)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ),
        }
        return onEdit || onDelete ? [...columns, actionCol] : columns
      }, [columns, onEdit, onDelete]),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        globalFilter,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setGlobalFilter,
      initialState: {
        pagination: {
          pageSize: pageSize,
        },
      },
    })

    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vigia-yellow"></div>
        </div>
      )
    }

    const rows = table.getRowModel().rows
    console.log('📋 Estado de la tabla:', {
      totalRows: Array.isArray(data) ? data.length : 0,
      renderedRows: rows.length,
      pageIndex: table.getState().pagination.pageIndex,
      pageSize: table.getState().pagination.pageSize,
      columns: table.getHeaderGroups()[0]?.headers.length,
    })
    console.log(
      '🔍 Primeros datos:',
      Array.isArray(data) ? data.slice(0, 2) : 'DATA NO ES UN ARRAY'
    )
    return (
      <div ref={ref} className="w-full space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vigia-yellow"
          />
          {onCreate && (
            <button
              onClick={onCreate}
              className="flex items-center gap-2 px-4 py-2 bg-vigia-yellow text-vigia-green font-semibold rounded-lg hover:bg-yellow-400 transition flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              Nuevo
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-vigia-green text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-semibold text-sm cursor-pointer hover:bg-emerald-700 transition select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <span>
                          {header.column.getIsSorted() === 'asc' ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : null}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-t border-gray-200 ${
                      idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-yellow-50 transition`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {rows.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Página {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()} ({rows.length} registros)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Anterior
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
)

DataTable.displayName = 'DataTable'
