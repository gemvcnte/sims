import React, { useState } from "react";
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
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import StudentsFiltersDrawer from "./StudentsFiltersDrawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAllStudents } from "../hooks/useAllStudents";
import AllStudentsTableSkeleton from "./AllStudentsTableSkeleton";
import ViewArchivedStudentProfileModal from "./ViewArchivedStudentProfileModal";

const AllStudentsTable = () => {
  const { allStudents, refetchStudents, loading, error } = useAllStudents();

  const refetchData = () => {
    refetchStudents();
  };

  if (loading) {
    return <AllStudentsTableSkeleton />;
  }

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
      accessorKey: "gradeLevel",
      header: "Grade",
      cell: ({ row }) => (
        <div className="">{row.original.schoolYear[0].gradeLevel}</div>
      ),
    },
    {
      accessorKey: "strand",
      header: "Strand",
      cell: ({ row }) => (
        <div className="">{row.original.schoolYear[0].strand}</div>
      ),
    },
    {
      accessorKey: "section",
      header: "Section",
      // header: "Students",
      cell: ({ row }) => (
        <div className="">{row.original.schoolYear[0].sectionName}</div>
      ),
    },
    {
      accessorKey: "schoolYear",
      header: "SY",
      // header: "Students",
      cell: ({ row }) => (
        <div className="">{row.original.schoolYear[0].year}</div>
      ),
    },
    {
      accessorKey: "semester",
      header: "Semester",
      // header: "Students",
      cell: ({ row }) => (
        <div className="">
          {row.original.schoolYear[0].semester == "first semester"
            ? "1st Semester"
            : "2nd Semester"}
        </div>
      ),
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
    data: allStudents,
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

  return (
    <div className="w-full px-4">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Search by Last Name..."
          value={table.getColumn("lastName")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("lastName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Drawer dismissible={true}>
          <DrawerTrigger>
            <Button variant="outline" className="flex gap-2">
              <span className="hidden sm:inline">Filters</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-filter"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </Button>
          </DrawerTrigger>
          <StudentsFiltersDrawer />
        </Drawer>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => {
                  refetchData();
                }}
                className="flex gap-2"
              >
                <span className="hidden sm:inline">Refresh Data</span>
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
            <Button variant="outline" className="ml-auto">
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
              {allStudents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No archived students found
                  </TableCell>
                </TableRow>
              ) : (
                <>
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
                          <TableCell key={cell.id}>
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
                </>
              )}
            </TableBody>
          </Table>
          {selectedRow && (
            <ViewArchivedStudentProfileModal
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

export default AllStudentsTable;
