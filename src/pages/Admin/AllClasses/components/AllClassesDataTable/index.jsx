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
  CircleEllipsis,
  MoreHorizontal,
  Trash2,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkeletonApplicationsDataTable from "./SkeletonApplicationsDataTable";
import { useSections } from "../../hooks/useSections";
import AllClassesFiltersDrawer from "./AllClassesFiltersDrawer";
import { useNavigate } from "react-router-dom";
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
import DeleteSectionAlertDialog from "@/components/delete-section-alert-dialog";
import ExportCsvButton from "@/components/export-csv-button";

const AllClassesDataTable = () => {
  const navigate = useNavigate();

  const { pendingApplications, loading, refetchData } = useSections();

  const columns = [
    // {
    //   accessorKey: "sectionName",
    //   header: "Section Name",
    //   cell: ({ row }) => <div>{row.getValue("sectionName")}</div>,
    // },

    {
      accessorKey: "sectionName",
      header: ({ column }) => {
        return (
          <Button
            className="m-0 p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Section Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.getValue("sectionName")}</div>,
    },

    {
      accessorKey: "gradeLevel",
      header: "Grade Level",
      // header: "Grade",
      cell: ({ row }) => <div>{row.getValue("gradeLevel")}</div>,
    },

    // {
    //   accessorKey: "strand",
    //   header: "Strand",
    //   cell: ({ row }) => <div>{row.getValue("strand")}</div>,
    // },

    {
      accessorKey: "strand",
      header: ({ column }) => {
        return (
          <Button
            className="m-0 p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Strand
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("strand")}</div>
      ),
    },

    {
      accessorKey: "adviser",
      header: "Adviser",
      cell: ({ row }) => <div>{row.getValue("adviser")}</div>,
    },

    {
      accessorKey: "schoolYear",
      header: "School Year",
      cell: ({ row }) => <div>{row.getValue("schoolYear")}</div>,
    },
    {
      accessorKey: "semester",
      header: "Semester",
      // header: "Students",
      cell: ({ row }) => (
        <div className="">
          {row.original.semester == "first semester" ? "1st" : "2nd"}
        </div>
      ),
    },

    {
      accessorKey: "totalStudents",
      header: "Total Students",
      // header: "Students",
      cell: ({ row }) => <div className="">{row.original.students.length}</div>,
    },

    {
      accessorKey: "totalSubjects",
      header: "Total Subjects",
      // header: "Subjects",
      cell: ({ row }) => <div className="">{row.original.subjects.length}</div>,
    },

    {
      accessorKey: "viewSection",
      header: "",
      cell: ({ row }) => (
        <button className="">
          View <span className="hidden sm:inline">Section</span>
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
      accessorKey: "deleteSection",
      header: "",
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DeleteSectionAlertDialog sectionId={row.original._id} />
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    totalSubjects: false,
  });
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
    return <SkeletonApplicationsDataTable />;
  }

  const navigateToClass = (classId) => {
    navigate(`${classId}`);
  };

  console.log(pendingApplications);

  const csvData = pendingApplications.map((section) => ({
    "SECTION NAME": section.sectionName,
    "GRADE LEVEL": section.gradeLevel,
    ADVISER: section.adviser,
    "SCHOOL YEAR": section.schoolYear,
    SEMESTER: section.semester,
    STRAND: section.strand,
    "TOTAL STUDENTS": section.students.length,
    "TOTAL SUBJECTS": section.subjects.length,
  }));

  const csvHeaders = [
    { label: "SECTION NAME", key: "SECTION NAME" },
    { label: "GRADE LEVEL", key: "GRADE LEVEL" },
    { label: "STRAND", key: "STRAND" },
    { label: "ADVISER", key: "ADVISER" },
    { label: "SCHOOL YEAR", key: "SCHOOL YEAR" },
    { label: "SEMESTER", key: "SEMESTER" },
    { label: "TOTAL STUDENTS", key: "TOTAL STUDENTS" },
    { label: "TOTAL SUBJECTS", key: "TOTAL SUBJECTS" },
  ];

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between gap-2 overflow-auto py-4">
        <section className="flex gap-2">
          {/* <Input
            placeholder="Filter lrns..."
            value={table.getColumn("lrn")?.getFilterValue() || ""}
            onChange={(event) =>
              table.getColumn("lrn")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          /> */}
          <Input
            placeholder="Search by Section Name..."
            value={table.getColumn("sectionName")?.getFilterValue() || ""}
            onChange={(event) =>
              table.getColumn("sectionName")?.setFilterValue(event.target.value)
            }
            className="min-w-[30ch] lg:min-w-[50ch]"
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
                  className="lucide lucide-filter"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
              </Button>
            </DrawerTrigger>
            <AllClassesFiltersDrawer />
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
              {/* <TooltipContent><p>Reload Data</p></TooltipContent> */}
            </Tooltip>
          </TooltipProvider>
        </section>

        <section className="flex w-full justify-end gap-2">
          <ExportCsvButton
            data={csvData}
            headers={csvHeaders}
            filename="sections.csv"
          />

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
                      navigateToClass(row.original._id);
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
          {table.getFilteredRowModel().rows.length} {""}
          section(s).
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

export default AllClassesDataTable;
