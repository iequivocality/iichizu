import type { PrefectureTourismStat } from '@/types';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const columns: ColumnDef<PrefectureTourismStat>[] = [
  {
    accessorKey: 'prefecture',
    header: ({ column }) => {
      return (
        <div
          className='flex justify-start items-center w-full'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Prefecture
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
  },
  {
    accessorKey: 'visitRate',
    header: ({ column }) => {
      return (
        <div
          className='flex justify-end items-center w-full'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Visit Rate
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('visitRate'));
      return <div className='text-right font-medium'>{amount.toFixed(2)}</div>;
    },
  },
];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
