import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewStudentProfileModal from "@/pages/Admin/ViewAllStudents/partials/ViewStudentProfileModal";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkeletonApplicationsDataTable from "./SkeletonApplicationsDataTable";
import { useStudentsInSpecificClass } from "../useStudentsInSpecificClass";
import { useParams } from "react-router-dom";

const StudentsInClassDataTable = () => {
  const {
    students,
    loading,
    error,
    fetchStudentsInSpecificClass,
    refetchStudentsInSpecificClass,
  } = useStudentsInSpecificClass();

  const { id } = useParams();
  const sectionId = id;

  useEffect(() => {
    fetchStudentsInSpecificClass(sectionId);
  }, [sectionId]);

  const refetchData = () => {
    fetchStudentsInSpecificClass(sectionId);
  };

  const columns = [
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
    },
    {
      accessorKey: "lrn",
      header: "LRN",
      cell: ({ row }) => <div>{row.getValue("lrn")}</div>,
    },

    {
      accessorKey: "viewProfile",
      header: "",
      cell: ({ row }) => (
        <button className="">
          View <span className="hidden sm:inline">Profile</span>
          <Icon
            icon="octicon:arrow-down-24"
            rotate={3}
            className="ml-2 hidden -rotate-45 transform transition-all duration-300 group-hover:rotate-45 sm:inline"
          />
          <span className="block h-[1px] max-w-0 bg-foreground transition-all duration-300 group-hover:max-w-[12ch]"></span>
        </button>
      ),
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: students,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const onClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const onSave = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  if (loading) {
    return <SkeletonApplicationsDataTable />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 pb-4">
        <section className="flex w-full gap-2">
          {/* <Input
            placeholder="Filter lrns..."
            value={table.getColumn("lrn")?.getFilterValue() || ""}
            onChange={(event) =>
              table.getColumn("lrn")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          /> */}
          <Input
            placeholder="Search by Last Name..."
            value={table.getColumn("lastName")?.getFilterValue() || ""}
            onChange={(event) =>
              table.getColumn("lastName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </section>

        <section className="flex w-full justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    refetchData();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-refresh-cw"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reload Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </div>
      <div className="rounded-md ">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    as={TableRow}
                    className="group transition-all duration-700 hover:cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedRow(row.original);
                    }}
                    data-state={row.getIsSelected() ? "selected" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {selectedRow && (
            <ViewStudentProfileModal
              application={selectedRow}
              onSave={onSave}
              onClose={onClose}
            />
          )}
        </Dialog>
      </div>
      <footer className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total of {""}
          {table.getFilteredRowModel().rows.length} student(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default StudentsInClassDataTable;