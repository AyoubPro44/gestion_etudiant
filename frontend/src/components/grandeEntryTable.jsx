import React, { useEffect, useState, useMemo, useCallback } from "react";
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
import { CSVLink } from 'react-csv';
import { logout } from "../services/authentification";
import { getEtudiantsWithNotes, insertEtudiantsNotes } from '../services/etudiantServices';
import { FaSave } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [etudiants, setEtudiants] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "num_etudiant",
    direction: "ascending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('auth') || localStorage.getItem('role') !== "professeur") {
      logout();
      navigate('/');
    } else {
      fetchEtudiants();
    }
  }, [navigate, props.classe]);

  const fetchEtudiants = async () => {
    try {
      const data = await getEtudiantsWithNotes(props.classe.id_sous_module, props.classe.id_filiere, props.classe.semestre);
      // Compute total for each student
      const studentsWithData = data.map(student => ({
        ...student,
        total: calculateTotal(student)
      }));
      setEtudiants(studentsWithData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const calculateTotal = useCallback((student) => {
    if (student.note_exam === null || student.note_cc === null || student.note_tp === null)
      return "----";
    const note_exam = parseFloat(student.note_exam) || 0;
    const note_tp = parseFloat(student.note_tp) || 0;
    const note_cc = parseFloat(student.note_cc) || 0;
    return (note_exam * 0.5 + note_tp * 0.25 + note_cc * 0.25).toFixed(2);
  }, []);

  const handleGradeChange = useCallback((studentId, columnKey, value) => {
    setEtudiants((prevEtudiants) =>
      prevEtudiants.map((student) => {
        if (student.id_etudiant === studentId) {
          const updatedStudent = {
            ...student,
            [columnKey]: parseFloat(value),
          };
          updatedStudent.total = calculateTotal(updatedStudent);
          return updatedStudent;
        }
        return student;
      })
    );
  }, [calculateTotal]);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredStudents = etudiants;

    if (hasSearchFilter) {
      filteredStudents = filteredStudents.filter((student) =>
        student.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
        student.lastname.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredStudents;
  }, [etudiants, filterValue]);

  const sortedItems = useMemo(() => {
    return filteredItems.sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = useCallback((student, columnKey) => {
    if (columnKey === "note_exam" || columnKey === "note_tp" || columnKey === "note_cc") {
      return (
        <input
          type="number"
          min={0}
          placeholder="note"
          className="border border-gray-300 rounded-md px-2 py-1 w-20"
          value={student[columnKey]}
          onChange={(e) => {
            handleGradeChange(student.id_etudiant, columnKey, e.target.value);
          }}
        />
      );
    } 
    return student[columnKey];
  }, [handleGradeChange, calculateTotal]);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const saveNotes = async () => {
    try {
      await insertEtudiantsNotes(etudiants, props.classe.id_sous_module);
      toast.success('Grades Updates Successfuly', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    catch (e) {
      console.error(e);
    }
  }

  const topContent = (
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
          <Button onClick={saveNotes} color="success" className="text-white" endContent={<FaSave />}>
            Save
          </Button>
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

  return (
    <div>
      <Table
        aria-label="Example table with custom cells and sorting"
        isHeaderSticky
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        className="mt-10 w-full max-w-full"
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
      <ToastContainer />
    </div>
  );
}
