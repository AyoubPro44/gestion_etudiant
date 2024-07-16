import React, { useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
} from "@nextui-org/react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { CSVLink } from 'react-csv';
import { logout } from "../services/authentification";
import { getAllProfs } from "../services/profServices";
import { MdModeEditOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const columns = [
    { name: "First Name", uid: "firstname", sortable: true },
    { name: "Last Name", uid: "lastname", sortable: true },
    { name: "Office Number", uid: "num_bureau", sortable: true },
    { name: "Number of Sub-Modules", uid: "nb_sous_modules", sortable: true },
    { name: "Planning", uid: "planning" },
];

const INITIAL_VISIBLE_COLUMNS = ["firstname", "lastname", "num_bureau", "nb_sous_modules", "planning"];

const headers = [
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Office Number', key: 'num_bureau' },
    { label: 'Number of Sub-Modules', key: 'nb_sous_modules' },
    { label: 'Planning', key: 'planning' },
];

const csvHeaders = [
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Office Number', key: 'num_bureau' },
    { label: 'Number of Sub-Modules', key: 'nb_sous_modules' },
];

export default function ProfsGestion() {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [selectedProfesseurs, setSelectedProfesseurs] = React.useState([]);
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "firstname",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const { id_filiere, semestre } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('auth') || localStorage.getItem('role') !== "admin") {
            logout();
            navigate('/');
        }
    }, []);

    const { data: professeurs = [], isLoading } = useQuery({
        queryKey: ["professeurs", id_filiere],
        queryFn: () => getAllProfs(),
    });

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => visibleColumns.has(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredProfesseurs = professeurs;

        if (hasSearchFilter) {
            filteredProfesseurs = filteredProfesseurs.filter((professeur) =>
                professeur.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
                professeur.lastname.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredProfesseurs;
    }, [professeurs, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return items.sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((professeur, columnKey) => {
        const cellValue = professeur[columnKey];
        return cellValue;
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<FaSearch />}
                        value={filterValue}
                        onClear={onClear}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<FaChevronDown className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <CSVLink
                            data={professeurs}
                            headers={csvHeaders}
                            filename={"professeurs.csv"}
                            className="flex items-center gap-2 btn btn-primary"
                        >
                            <Button color="primary" endContent={<LuDownload />}>
                                Download List
                            </Button>
                        </CSVLink>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {professeurs?.length} professeurs</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        onRowsPerPageChange,
        professeurs?.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <div className="py-12 px-4 h-full">
            <div className="container mx-auto px-4">
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    bottomContent={bottomContent}
                    topContent={topContent}
                    selectedKeys={selectedKeys}
                    sortDescriptor={sortDescriptor}
                    topContentPlacement="outside"
                    bottomContentPlacement="outside"
                    onSortChange={setSortDescriptor}
                    onSelectionChange={setSelectedKeys}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                allowsSorting={column.sortable}
                                className="bg-gray-200"
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={sortedItems}>
                        {(item) => (
                            <TableRow key={item.id_professeur}>

                                {(columnKey) => (
                                    columnKey == 'planning'
                                        ? <TableCell className="flex flex-row gap-4">
                                            <FaEye size={20} className="cursor-pointer text-indigo-600 hover:text-indigo-900 mr-4" title="View Planning" />
                                            <MdModeEditOutline size={20} className="cursor-pointer text-purple-600 hover:text-purple-900" title="Edit Planning" />
                                          </TableCell>
                                        : <TableCell>{renderCell(item, columnKey)}</TableCell>

                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
