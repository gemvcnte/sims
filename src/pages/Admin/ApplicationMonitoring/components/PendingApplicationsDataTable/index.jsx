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
import { enrollApplicationEndpoint } from "@/config/adminEndpoints";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { toast } from "react-toastify";

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

  const { pendingApplications, filterApplications } = usePendingApplications();

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
    {
      accessorKey: "reject",
      header: "",
      cell: ({ row }) => (
        <Button
          className="my-1 h-8 px-4 py-0"
          onClick={(e) => {
            e.stopPropagation();
            handleReject();
          }}
          variant="outline"
        >
          Reject
        </Button>
      ),
    },
    {
      accessorKey: "enroll",
      header: "",
      cell: ({ row }) => (
        <Button
          className="my-1 h-8 px-4 py-0"
          onClick={(e) => {
            e.stopPropagation();
            handleEnroll(row.original);
          }}
        >
          Enroll
        </Button>
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

  return (
    <div className="w-full px-4">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter lrns..."
          value={table.getColumn("lrn")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("lrn")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Drawer dismissible={true}>
          <DrawerTrigger>
            <Button variant="outline">Filters</Button>
          </DrawerTrigger>
          <PendingFiltersDrawer />
        </Drawer>

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
                      <TableCell key={cell.id} className="py-0">
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
