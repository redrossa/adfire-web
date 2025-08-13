import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/app/components/ui/table';
import {
  flexRender,
  RowData,
  Table as ReactTable,
} from '@tanstack/react-table';

interface Props<TData extends RowData> {
  table: ReactTable<TData>;
}

const List = <TData extends RowData>({ table }: Props<TData>) => (
  <div className="border transition-colors overflow-hidden rounded-md">
    <Table>
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
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);

export default List;
