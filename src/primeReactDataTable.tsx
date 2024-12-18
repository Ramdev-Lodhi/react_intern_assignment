/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import TableComponent from "./components/TableComponent";
import OverlayPanel_SelectRow from "./components/OverlayPanel_CustomRow";
import { getAPI_Data } from "./services/apiService";
import { OverlayPanel } from "primereact/overlaypanel";
import { TableData } from "./types/TableTypes";

const PrimeReactDataTable: React.FC = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectCount, setSelectCount] = useState<number>(0);
  const overlayPanelRef = useRef<OverlayPanel>(null);

  useEffect(() => {
    const loadData = async () => {
      const { tableData, totalRecords, limit } = await getAPI_Data(page);
      setTableData(tableData);
      setTotalRecords(totalRecords);
      setRowsPerPage(limit);
    };
    loadData();
  }, [page]);

  const onRowSelectChange = (e: any, apiData_Id: number) => {
    setSelectedRows((prev) => ({ ...prev, [apiData_Id]: e.checked }));
  };

  const onSelectAllChange = (e: any) => {
    const newSelectedRows: Record<number, boolean> = {};
    if (e.checked) {
      tableData.forEach((tableData) => {
        newSelectedRows[tableData.id] = true;
      });
    }
    setSelectedRows(newSelectedRows);
  };

  const onPageChange = (e: any) => {
    setPage((e.page ?? 0) + 1);
    setRowsPerPage(e.rows);
  };

  const CustomRowSelect = async () => {
    const count = selectCount;
    const newSelectedRows: Record<number, boolean> = { ...selectedRows };
    let selectedCount = Object.keys(newSelectedRows).filter(
      (key) => newSelectedRows[Number(key)]
    ).length;

    let currentPage = page;

    while (selectedCount < count) {
      if (currentPage !== page || selectedCount === 0) {
        const { tableData: nextData } = await getAPI_Data(currentPage);
        for (const table_data of nextData) {
          if (!newSelectedRows[table_data.id] && selectedCount < count) {
            newSelectedRows[table_data.id] = true;
            selectedCount++;
          }
        }
        console.log(currentPage);
        currentPage++;
      } else {
        for (const tabledata of tableData) {
          if (!newSelectedRows[tabledata.id] && selectedCount < count) {
            newSelectedRows[tabledata.id] = true;
            selectedCount++;
          }
        }
      }
      if (selectedCount >= totalRecords) {
        break;
      }
    }
    setSelectedRows(newSelectedRows);
    overlayPanelRef.current?.hide();
  };

  return (
    <div>
      <h3>Prime React DataTable</h3>
      <TableComponent
        data={tableData}
        rowsPerPage={rowsPerPage}
        totalRecords={totalRecords}
        page={page}
        selectedRows={selectedRows}
        onSelectAllChange={onSelectAllChange}
        onRowSelectChange={onRowSelectChange}
        onPageChange={onPageChange}
        overlayPanelRef={overlayPanelRef}
      />
      <OverlayPanel_SelectRow
        overlayRef={overlayPanelRef}
        selectCount={selectCount}
        totalRecords={totalRecords}
        onChange={(e) => setSelectCount(parseInt(e.target.value, 10))}
        onSubmit={CustomRowSelect}
      />
    </div>
  );
};

export default PrimeReactDataTable;
