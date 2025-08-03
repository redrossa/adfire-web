import {
  flexRender,
  Table as ReactTable,
  RowData,
} from '@tanstack/react-table';

export interface GridListProps<T> {
  table: ReactTable<T>;
}

const GridList = <T extends RowData>({ table }: GridListProps<T>) => {
  return (
    <div className="border border-foreground-200 dark:border-foreground-100 rounded-md">
      <table className="w-full table-auto border-collapse">
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-foreground-100/50 dark:hover:bg-foreground-50/50 [&:not(:last-child)]:border-b border-foreground-200 dark:border-foreground-100 group"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-4 group-first:first:rounded-tl-md group-first:last:rounded-tr-md group-last:first:rounded-bl-md group-last:last:rounded-br-md"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridList;
