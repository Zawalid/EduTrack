"use client";

import { Table } from "@tanstack/react-table";
import { Download, RefreshCcw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { DeleteStudentsDialog } from "../delete-students-dialog";
import { exportTableToCSV } from "@/lib/export";
import { CLASSES } from "@/lib/constants";
import { useTransition } from "react";
import { revalidate } from "@/lib/api/students/actions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  fields: string[];
}

export function DataTableToolbar<TData>({ table, fields }: DataTableToolbarProps<TData>) {
  const [isRefreshPending, startRefreshTransition] = useTransition();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search for students..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("field") && (
          <DataTableFacetedFilter
            column={table.getColumn("field")}
            title="Field"
            options={fields.map((field) => ({ value: field, label: field }))}
          />
        )}
        {table.getColumn("className") && (
          <DataTableFacetedFilter
            column={table.getColumn("className")}
            title="Class"
            options={CLASSES.map((className) => ({ value: className, label: className }))}
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => startRefreshTransition(async () => await revalidate())}
        >
          <RefreshCcw className={isRefreshPending ? "animate-spin" : ""} />
        </Button>
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
              students={
                table.getFilteredSelectedRowModel().rows.map((row) => row.original) as Student[]
              }
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
