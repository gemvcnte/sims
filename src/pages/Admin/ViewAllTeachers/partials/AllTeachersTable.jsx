import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUp,
  MoreHorizontal,
} from "lucide-react";
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
import ViewTeacherProfileModal from "./ViewTeacherProfileModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAllTeachers } from "../hooks/useAllTeachers";
import AllTeachersTableSkeleton from "./AllTeachersTableSkeleton";
import ExportCsvButton from "@/components/export-csv-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllTeachersTable = () => {
  const { allTeachers, refetchTeachers, loading, error } = useAllTeachers();

  const csvData = allTeachers.map((teacher) => ({
    FIRSTNAME: teacher.firstName,
    MIDDLENAME: teacher.middleName,
    LASTNAME: teacher.lastName,
    USERNAME: teacher.username,
  }));

  const csvHeaders = [
    { label: "LAST NAME", key: "LASTNAME" },
    { label: "FIRST NAME", key: "FIRSTNAME" },
    { label: "MIDDLE NAME", key: "MIDDLENAME" },
    { label: "USERNAME", key: "USERNAME" },
  ];

  const refetchData = () => {
    refetchTeachers();
  };

  if (loading) {
    return <AllTeachersTableSkeleton />;
  }

  const columns = [
    // {
    //   accessorKey: "lastName",
    //   header: "Last Name",
    //   cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    // },

    {
      accessorKey: "lastName",
      header: ({ column }) => {
        return (
          <Button
            className="m-0 p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.getValue("lastName")}</div>,
    },

    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
    },

    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            className="m-0 p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.getValue("username")}</div>,
    },

    // {
    //   accessorKey: "username",
    //   header: "Username",
    //   cell: ({ row }) => <div>{row.getValue("username")}</div>,
    // },
    {
      accessorKey: "viewProfile",
      header: "",
      cell: ({ row }) => (
        <button className="">
          View <span className="hidden sm:inline">Profile</span>
          <Icon
            icon="octicon:arrow-down-24"
            rotate={3}
            className="ml-2 hidden -rotate-45 transform transition-all duration-300 group-hover:rotate-45 sm:inline-block"
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
    data: allTeachers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 5, //custom default page size
      },
    },
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

  const pageSizeOptions = [5, 10, 20, 30, 40, 50];

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between gap-2 overflow-auto py-4 lg:overflow-visible">
        <section className="flex gap-2">
          <Input
            placeholder="Filter usernames..."
            value={table.getColumn("username")?.getFilterValue() || ""}
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
            className="min-w-[27ch] lg:min-w-[50ch]"
          />

          <TooltipProvider delayDuration={10}>
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
        </section>

        <section className="flex gap-2">
          <ExportCsvButton
            data={csvData}
            headers={csvHeaders}
            filename="teachers.csv"
          />

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
            </TableBody>
          </Table>
          {selectedRow && (
            <ViewTeacherProfileModal
              application={selectedRow}
              onSave={onSave}
              onClose={onClose}
            />
          )}
        </Dialog>
      </div>

      <footer className="flex items-center justify-end space-x-2 py-4">
        <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
          <div className="flex-1 text-sm text-muted-foreground">
            Total of {""}
            {table.getFilteredRowModel().rows.length} teacher(s).
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">
                Rows per page
              </p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                aria-label="Go to first page"
                variant="outline"
                className="size-8 hidden p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsUp className="size-4 -rotate-90" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to previous page"
                variant="outline"
                className="size-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to next page"
                variant="outline"
                className="size-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to last page"
                variant="outline"
                className="size-8 hidden p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsUp className="size-4 rotate-90" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* <footer className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total of {""}
          {table.getFilteredRowModel().rows.length} teacher(s).
        </div>

        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      </footer> */}
    </div>
  );
};

export default AllTeachersTable;
