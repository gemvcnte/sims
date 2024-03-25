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
import { usePendingApplications } from "../../hooks/usePendingApplications";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import PendingFiltersDrawer from "./PendingFiltersDrawer";
import axios from "axios";
import getAuthHeaders from "@/utils/getAuthHeaders";
import {
  enrollApplicationEndpoint,
  rejectApplicationEndpoint,
} from "@/config/adminEndpoints";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkeletonApplicationsDataTable from "./SkeletonApplicationsDataTable";
import AllStudentsTableSkeleton from "@/pages/Admin/ViewAllStudents/partials/AllStudentsTableSkeleton";
import ViewStudentApplicationModal from "../ViewStudentApplicationModal";

const PendingApplicationsDataTable = () => {
  const [enrolledRowIds, setEnrolledRowIds] = useState([]);

  const handleEnroll = async (application) => {
    try {
      const response = await axios.post(
        enrollApplicationEndpoint,
        { studentApplicationId: application._id },
        getAuthHeaders(),
      );

      // showSuccessNotification("");
      toast.success("Student Enrolled Successfully", {
        position: "top-right",
        autoClose: 1000,
      });
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

      // showSuccessNotification("Application Rejected");
      toast.success("Application Rejected", {
        position: "top-right",
        autoClose: 1000,
      });
      setEnrolledRowIds([...enrolledRowIds, application._id]); // Store the ID of the enrolled row in the array
    } catch (error) {
      console.error("Error rejecting student:", error.message);
    }
  };

  const { pendingApplications, loading, refetchData } =
    usePendingApplications();

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
              d="M5.49998 0.5C5.49998 0.223858 5.72383 0 5.99998 0H7.49998H8.99998C9.27612 0 9.49998 0.223858 9.49998 0.5C9.49998 0.776142 9.27612 1 8.99998 1H7.99998V2.11922C9.09832 2.20409 10.119 2.56622 10.992 3.13572C11.0116 3.10851 11.0336 3.08252 11.058 3.05806L11.858 2.25806C12.1021 2.01398 12.4978 2.01398 12.7419 2.25806C12.986 2.50214 12.986 2.89786 12.7419 3.14194L11.967 3.91682C13.1595 5.07925 13.9 6.70314 13.9 8.49998C13.9 12.0346 11.0346 14.9 7.49998 14.9C3.96535 14.9 1.09998 12.0346 1.09998 8.49998C1.09998 5.13362 3.69904 2.3743 6.99998 2.11922V1H5.99998C5.72383 1 5.49998 0.776142 5.49998 0.5ZM2.09998 8.49998C2.09998 5.51764 4.51764 3.09998 7.49998 3.09998C10.4823 3.09998 12.9 5.51764 12.9 8.49998C12.9 11.4823 10.4823 13.9 7.49998 13.9C4.51764 13.9 2.09998 11.4823 2.09998 8.49998ZM7.99998 4.5C7.99998 4.22386 7.77612 4 7.49998 4C7.22383 4 6.99998 4.22386 6.99998 4.5V9.5C6.99998 9.77614 7.22383 10 7.49998 10C7.77612 10 7.99998 9.77614 7.99998 9.5V4.5Z"
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

    {
      accessorKey: "enroll",
      header: "",
      cell: ({ row }) => (
        <span className="flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="my-1 h-8 px-4 py-0"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Reject
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone and will permanently reject the
                  student's application status.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(row.original);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            className="my-1 h-8 px-4 py-0"
            onClick={(e) => {
              e.stopPropagation();
              handleEnroll(row.original);
            }}
          >
            Enroll
          </Button>
        </span>
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

  return (
    <div className="w-full px-4">
      <div className="flex items-center gap-2 py-4">
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
          <PendingFiltersDrawer />
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
        <div className="flex-1 text-sm text-muted-foreground">
          Total of {""}
          {table.getFilteredRowModel().rows.length - enrolledRowIds.length}{" "}
          student(s).
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

export default PendingApplicationsDataTable;
