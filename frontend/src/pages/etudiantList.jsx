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
import { getEtudiantsByFiliere } from '../services/etudiantServices';
import { CSVLink } from 'react-csv';
import { logout } from "../services/authentification";

const columns = [
    { name: "Numéro Étudiant", uid: "num_etudiant", sortable: true },
    { name: "Prénom", uid: "firstname", sortable: true },
    { name: "Nom", uid: "lastname", sortable: true },
    { name: "Email", uid: "email", sortable: true },
    { name: "Date de Naissance", uid: "date_de_naissance", sortable: true },
    { name: "Adresse", uid: "adresse" },
];

const INITIAL_VISIBLE_COLUMNS = ["num_etudiant", "firstname", "lastname", "email", "date_de_naissance", "adresse"];

const headers = [
    { label: 'Numéro Étudiant', key: 'num_etudiant' },
    { label: 'Prénom', key: 'firstname' },
    { label: 'Nom', key: 'lastname' },
    { label: 'Email', key: 'email' },
    { label: 'Date de Naissance', key: 'date_de_naissance' },
    { label: 'Adresse', key: 'address' },
];



export default function EtudiantList() {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [selectedEtudiants, setSelectedEtudiants] = React.useState([]);
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "num_etudiant",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const { id_filiere, semestre } = useParams();

    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('auth') || localStorage.getItem('role') != "professeur") {
            logout();
            navigate('/');
        }
    }, [])

    const { data: etudiants = [], isLoading } = useQuery({
        queryKey: ["etudiants", id_filiere],
        queryFn: () => getEtudiantsByFiliere(id_filiere, semestre),
    });



    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => visibleColumns.has(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredStudents = etudiants;

        if (hasSearchFilter) {
            filteredStudents = filteredStudents.filter((student) =>
                student.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
                student.lastname.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredStudents;
    }, [etudiants, filterValue]);

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

    const renderCell = React.useCallback((student, columnKey) => {
        const cellValue = student[columnKey];
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
                            data={etudiants}
                            headers={headers}
                            filename={"etudiants.csv"}
                            className="flex items-center gap-2 btn btn-primary"
                        >
                            <Button color="primary" endContent={<LuDownload />}>
                                Download List
                            </Button>
                        </CSVLink>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {etudiants?.length} etudiants</span>
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
        etudiants?.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {/* {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`} */}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
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
        <div className="bg-gray-100 py-12 px-4 h-full">
            <div className="container mx-auto px-4">
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    selectedKeys={selectedKeys}
                    // selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={"start"}
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"No students found"} items={sortedItems}>

                        {(item) => (
                            <TableRow key={item.num_etudiant}>
                                {(columnKey) => (
                                    <TableCell key={columnKey}>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
