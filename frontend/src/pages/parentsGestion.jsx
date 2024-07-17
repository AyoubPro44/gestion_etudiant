import React, { useEffect, useState } from "react";
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
    useDisclosure,
    Modal,
} from "@nextui-org/react";
import { FaSearch, FaChevronDown, FaUserFriends } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { logout } from "../services/authentification";
import { getParents } from "../services/parentServices";
import { FaEye } from "react-icons/fa";
import ParentEtudiantsModal from "../components/gestionParents/parentEtudiantsModal";

const columns = [
    { name: "First Name", uid: "firstname", sortable: true },
    { name: "Last Name", uid: "lastname", sortable: true },
    { name: "Email", uid: "email", sortable: true },
    { name: "Number of Students", uid: "nb_etudiants", sortable: true },
    { name: "Actions", uid: "actions", sortable: false }, // New action column
];

const INITIAL_VISIBLE_COLUMNS = ["firstname", "lastname", "email", "nb_etudiants", "actions"]; // Include actions in initial visible columns

const csvHeaders = [
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Email', key: 'email' },
    { label: 'Number of Students', key: 'nb_etudiants' },
];

export default function ParentsGestion() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "firstname",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const [selectedParent, setSelectedParent] = useState(null); // State to store selected parent
    const [parents, setParents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('auth') || localStorage.getItem('role') !== "admin") {
            logout();
            navigate('/');
        } else {
            fetchParents();
        }
    }, []);

    const fetchParents = async () => {
        try {
            const response = await getParents();
            setParents(response);
        } catch (error) {
            console.error(error);
        }
    }

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => visibleColumns.has(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredParents = parents;

        if (hasSearchFilter) {
            filteredParents = filteredParents.filter((parent) =>
                parent.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
                parent.lastname.toLowerCase().includes(filterValue.toLowerCase()) ||
                parent.email.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredParents;
    }, [parents, filterValue]);

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

    const renderCell = React.useCallback((parent, columnKey) => {
        const cellValue = parent[columnKey];
        if (columnKey === "actions") {
            return (
                <ParentEtudiantsModal id_parent={parent.id_parent} firstname={parent.firstname} lastname={parent.lastname} />
            );
        }

        return cellValue;
    }, [onOpen]);

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
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
                    <FaUserFriends className="mr-4 text-indigo-500" />
                    Parents
                </h2>
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name or email..."
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
                            data={parents}
                            headers={csvHeaders}
                            filename={"parents.csv"}
                            className="flex items-center gap-2 btn btn-primary"
                        >
                            <Button color="primary" endContent={<LuDownload />}>
                                Download List
                            </Button>
                        </CSVLink>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {parents?.length} parents</span>
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
        parents?.length,
        onSearchChange,
        hasSearchFilter,
    ]);


    const closeModal = () => {
        onClose();
        setSelectedParent(null); // Reset selected parent when modal is closed
    };

    const modalContent = selectedParent && (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            hideOverlay={false}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            width="500px"
        >
            <Modal.Header>Title of Modal</Modal.Header>
            <Modal.Content>
                <p>First Name: {selectedParent.firstname}</p>
                <p>Last Name: {selectedParent.lastname}</p>
                <p>Email: {selectedParent.email}</p>
                <p>Number of Students: {selectedParent.nb_etudiants}</p>
            </Modal.Content>
            <Modal.Action passive onClick={closeModal}>
                Close
            </Modal.Action>
        </Modal>
    );

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
    }, [items.length, page, pages, hasSearchFilter]);

    return (
        <div className="py-12 px-8 h-full">
            <div className="container mx-auto px-4">
                {modalContent}
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    bottomContent={bottomContent}
                    topContent={topContent}
                    sortDescriptor={sortDescriptor}
                    topContentPlacement="outside"
                    bottomContentPlacement="outside"
                    onSortChange={setSortDescriptor}
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
                        {(parent) => (
                            <TableRow key={parent.id_parent}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(parent, columnKey)}
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
