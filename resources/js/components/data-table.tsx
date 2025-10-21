import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
} from '@tanstack/react-table';
import React, { useCallback, useMemo, useState } from 'react';
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    createButton?: React.ReactNode;
    showIndexColumn?: boolean;
}

export default function DataTable<TData>({
    columns,
    data,
    createButton = null,
    showIndexColumn = false,
}: DataTableProps<TData>) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);

    const memoizedData = useMemo(() => data, [data]);

    const handleGlobalFilterChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setGlobalFilter(e.target.value);
        },
        [],
    );

    const finalColumns = useMemo(() => {
        if (!showIndexColumn) return columns;

        const indexColumn: ColumnDef<TData> = {
            id: 'index',
            header: '#',
            cell: ({ row, table }) => {
                const { pageIndex, pageSize } = table.getState().pagination;
                const totalFiltered = table.getFilteredRowModel().rows.length;
                const absolute = pageIndex * pageSize + row.index + 1;
                return absolute <= totalFiltered ? absolute : row.index + 1;
            },
        };

        return [indexColumn, ...columns];
    }, [columns, showIndexColumn]);

    const table = useReactTable({
        data: memoizedData,
        columns: finalColumns,
        state: {
            globalFilter,
            sorting,
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={handleGlobalFilterChange}
                    className="w-1/3"
                />
                {createButton}
            </div>

            <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-xs">
                    <thead className="border-b">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer px-4 py-2 text-left select-none"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {{
                                            asc: ' ↑',
                                            desc: ' ↓',
                                        }[
                                            header.column.getIsSorted() as string
                                        ] ?? ''}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-b">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-2">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-4 text-center"
                                >
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <p className="text-xs">
                    Showing{' '}
                    {table.getPaginationRowModel().rows.length > 0
                        ? table.getState().pagination.pageIndex *
                              table.getState().pagination.pageSize +
                          1
                        : 0}{' '}
                    to{' '}
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) *
                            table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length,
                    )}{' '}
                    of {table.getFilteredRowModel().rows.length} data
                </p>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <p className="text-xs">Rows per page</p>
                        <Select
                            value={String(table.getState().pagination.pageSize)}
                            onValueChange={(value) =>
                                table.setPageSize(Number(value))
                            }
                        >
                            <SelectTrigger className="w-16">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 25, 50].map((num) => (
                                    <SelectItem key={num} value={String(num)}>
                                        {num}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.setPageIndex(0)}
                        >
                            <MdKeyboardDoubleArrowLeft />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                        >
                            <MdKeyboardArrowLeft />
                        </Button>
                        <span className="text-xs">
                            {table.getState().pagination.pageIndex + 1} /{' '}
                            {table.getPageCount()}
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                        >
                            <MdKeyboardArrowRight />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={!table.getCanNextPage()}
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                        >
                            <MdKeyboardDoubleArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
