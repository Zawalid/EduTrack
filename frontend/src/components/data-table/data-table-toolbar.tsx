"use client";

import { Table } from "@tanstack/react-table";
import { Download, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { priorities } from "@/data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { DeleteStudentsDialog } from "../delete-students-dialog";
import { exportTableToCSV } from "@/lib/export";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  fields: string[];
}

export function DataTableToolbar<TData>({ table, fields }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter students..."
          value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("firstName")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("field") && (
          <DataTableFacetedFilter
            column={table.getColumn("field")}
            title="Field"
            options={fields.map((field) => ({ value: field, label: field }))}
          />
        )}
        {table.getColumn("average") && (
          <DataTableFacetedFilter
            column={table.getColumn("average")}
            title="Average"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>

      <div className="flex gap-x-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <>
            <Button
              variant="ghost"
              onClick={() => table.toggleAllRowsSelected(false)}
              className="h-8 px-2 lg:px-3"
            >
              Clear Selection
              <X />
            </Button>
            <DeleteStudentsDialog
              students={table.getFilteredSelectedRowModel().rows.map((row) => row.original)}
              onSuccess={() => table.toggleAllRowsSelected(false)}
            />
          </>
        ) : null}

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "students",
              excludeColumns: ["select", "actions"],
            })
          }
          className="gap-2"
        >
          <Download className="size-4" aria-hidden="true" />
          Export
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
