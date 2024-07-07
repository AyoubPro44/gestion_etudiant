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
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getEtudiantsByFiliere } from '../services/etudiantServices';
import { CSVLink } from 'react-csv';
import { logout } from "../services/authentification";

const columns = [
  { name: "Numéro Étudiant", uid: "num_etudiant", sortable: true },
  { name: "Prénom", uid: "firstname", sortable: true },
  { name: "Nom", uid: "lastname", sortable: true },
  { name: "Note exam", uid: "note_exam", sortable: false },
  { name: "Note TP", uid: "note_tp", sortable: false },
  { name: "Note CC", uid: "note_cc", sortable: false },
  { name: "Total", uid: "total", sortable: false },
];

const headers = [
  { label: 'Numéro Étudiant', key: 'num_etudiant' },
  { label: 'Prénom', key: 'firstname' },
  { label: 'Nom', key: 'lastname' },
  { label: 'Note exam', key: 'note_exam' },
  { label: 'Note TP', key: 'note_tp' },
  { label: 'Note CC', key: 'note_cc' },
  { label: 'Total', key: 'total' },
];

export default function GrandeEntryTable(props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "num_etudiant",
    direction: "ascending",
  });
  const [grades, setGrades] = React.useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('auth') || localStorage.getItem('role') !== "professeur") {
      logout();
      navigate('/');
    }
  }, [navigate]);

  const { data: etudiants = [], isLoading } = useQuery({
    queryKey: ["etudiants", props.classe.id_filiere, props.classe.semestre],
    queryFn: () => getEtudiantsByFiliere(props.classe.id_filiere, props.classe.semestre),
    enabled: !!props.classe.id_filiere && !!props.classe.semestre,
  });

  const hasSearchFilter = Boolean(filterValue);

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

  const sortedItems = React.useMemo(() => {
    return filteredItems.sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const handleGradeChange = (studentId, columnKey, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [columnKey]: value,
      },
    }));
  };

  const renderCell = React.useCallback((student, columnKey) => {
    if (columnKey === "note_exam" || columnKey === "note_tp" || columnKey === "note_cc" || columnKey === "total") {
      return (
        <input
          type="text"
          value={grades[student.num_etudiant]?.[columnKey] || ""}
          onChange={(e) => handleGradeChange(student.num_etudiant, columnKey, e.target.value)}
        />
      );
    }
    return student[columnKey];
  }, [grades]);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
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
      </div>
    );
  }, [
    filterValue,
    etudiants?.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  return (
    <div className="bg-gray-100 py-12 px-4 h-full">
      <div className="container mx-auto px-4">
        <Table
          aria-label="Example table with custom cells and sorting"
          isHeaderSticky
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={columns}>
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
