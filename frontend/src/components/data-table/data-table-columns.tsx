"use client";

import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

interface GetColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Student> | null>>;
}

export function getColumns({ setRowAction }: GetColumnsProps): ColumnDef<Student>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableHiding: false,
    },
    {
      accessorKey: "cne",
      header: ({ column }) => <DataTableColumnHeader column={column} title="CNE" />,
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("cne")}</div>,
      enableHiding: false,
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />,
      cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />,
      cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "className",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Class" />,
      cell: ({ row }) => <div>{row.getValue("className")}</div>,
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "field",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Field" />,
      cell: ({ row }) => <div>{row.getValue("field")}</div>,
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "average",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Average" />,
      cell: ({ row }) => <div>{row.getValue("average") ? row.getValue("average") : "N/A"}</div>,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        // return (
        //   <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //       <Button
        //         aria-label="Open menu"
        //         variant="ghost"
        //         className="flex size-8 p-0 data-[state=open]:bg-muted"
        //       >
        //         <Ellipsis className="size-4" aria-hidden="true" />
        //       </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="end" className="w-40">
        //       <DropdownMenuItem onSelect={() => setRowAction({ row, type: "update" })}>
        //         Edit
        //       </DropdownMenuItem>
        //       <DropdownMenuSeparator />
        //       <DropdownMenuItem onSelect={() => setRowAction({ row, type: "delete" })}>
        //         Delete
        //       </DropdownMenuItem>
        //     </DropdownMenuContent>
        //   </DropdownMenu>
        // );
        return <DataTableRowActions row={row} setRowAction={setRowAction} />;
      },
      size: 40,
    },
  ];
}
