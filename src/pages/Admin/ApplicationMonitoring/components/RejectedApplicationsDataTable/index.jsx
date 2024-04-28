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
import ViewStudentProfileModal from "@/pages/Admin/ViewAllStudents/partials/ViewStudentProfileModal";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import axios from "axios";
import getAuthHeaders from "@/utils/getAuthHeaders";
import {
  enrollApplicationEndpoint,
  rejectApplicationEndpoint,
} from "@/config/adminEndpoints";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkeletonApplicationsDataTable from "./SkeletonApplicationsDataTable";
import { useRejectedApplications } from "../../hooks/useRejectedApplications";
import RejectedFiltersDrawer from "./RejectedFiltersDrawer";
import AllStudentsTableSkeleton from "@/pages/Admin/ViewAllStudents/partials/AllStudentsTableSkeleton";
import ViewStudentApplicationModal from "../ViewStudentApplicationModal";
import ExportCsvButton from "@/components/export-csv-button";

const RejectedApplicationsDataTable = () => {
  const [enrolledRowIds, setEnrolledRowIds] = useState([]);

  const handleEnroll = async (application) => {
    try {
      const response = await axios.post(
        enrollApplicationEndpoint,
        { studentApplicationId: application._id },
        getAuthHeaders(),
      );

      showSuccessNotification("Student Enrolled Successfully");
      setEnrolledRowIds([...enrolledRowIds, application._id]); // Store the ID of the enrolled row in the array
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  };

  const handleReject = async (application) => {
    try {
      const response = await axios.patch(
        rejectApplicationEndpoint,
        { studentApplicationId: application._id },
        getAuthHeaders(),
      );

      showSuccessNotification("Application Rejected");
      setEnrolledRowIds([...enrolledRowIds, application._id]); // Store the ID of the enrolled row in the array
    } catch (error) {
      console.error("Error rejecting student:", error.message);
    }
  };

  const { pendingApplications, loading, refetchData } =
    useRejectedApplications();

  const csvData = pendingApplications.map((student) => ({
    FIRSTNAME: student.firstName,
    MIDDLENAME: student.middleName,
    LASTNAME: student.lastName,
    LRN: student.lrn,
    STATUS: student.status,
    "SCHOOL YEAR": student.schoolYear[0].year,
    SEMESTER: student.schoolYear[0].semester,
  }));

  const csvHeaders = [
    { label: "LAST NAME", key: "LASTNAME" },
    { label: "FIRST NAME", key: "FIRSTNAME" },
    { label: "MIDDLE NAME", key: "MIDDLENAME" },
    { label: "LRN", key: "LRN" },
    { label: "SCHOOL YEAR", key: "SCHOOL YEAR" },
    { label: "SEMESTER", key: "SEMESTER" },
    { label: "STATUS", key: "STATUS" },
  ];

  const columns = [
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
      accessorKey: "lrn",
      header: "LRN",
      cell: ({ row }) => <div>{row.getValue("lrn")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center text-xs">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4 text-muted-foreground"
          >
            <path
              d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          {row.getValue("status")}
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
    data: pendingApplications,
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

  if (loading) {
    return <AllStudentsTableSkeleton />;
  }

  const pageSizeOptions = [5, 10, 20, 30, 40, 50];

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between gap-2 overflow-auto py-4 lg:overflow-visible">
        <section className="flex gap-2">
          {" "}
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
            className="min-w-[27ch] lg:min-w-[50ch]"
          />
          <Drawer dismissible={true}>
            <DrawerTrigger>
              <Button variant="secondary" className="flex gap-2">
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
            <RejectedFiltersDrawer />
          </Drawer>
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
            filename="Rejected_Student_Applications.csv"
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
                    // Add conditional rendering based on enrolledRowIds array
                    style={{
                      display: enrolledRowIds.includes(row.original._id)
                        ? "none"
                        : "table-row",
                    }}
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
            <ViewStudentApplicationModal
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
            {table.getFilteredRowModel().rows.length} student(s).
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
                <DoubleArrowRightIcon
                  className="w-8 rotate-180"
                  aria-hidden="true"
                />
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
                <ChevronRightIcon className="w-8" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to last page"
                variant="outline"
                className="size-8 hidden p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <DoubleArrowRightIcon className="w-8" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RejectedApplicationsDataTable;
