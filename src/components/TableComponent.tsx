/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { OverlayPanel } from "primereact/overlaypanel";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { TableData } from "../types/TableTypes";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
interface Table {
  data: TableData[];
  rowsPerPage: number;
  totalRecords: number;
  page: number;
  selectedRows: Record<number, boolean>;
  onSelectAllChange: (e: any) => void;
  onRowSelectChange: (e: any, id: number) => void;
  onPageChange: (e: DataTablePageEvent) => void;
  overlayPanelRef: React.RefObject<OverlayPanel>;
}

const TableComponent: React.FC<Table> = ({
  data,
  rowsPerPage,
  totalRecords,
  page,
  selectedRows,
  onSelectAllChange,
  onRowSelectChange,
  onPageChange,
  overlayPanelRef,
}) => {
  const isAllSelected =
    data.length > 0 && data.every((data) => selectedRows[data.id]);

  return (
    <DataTable
      value={data}
      paginator
      rows={rowsPerPage}
      totalRecords={totalRecords}
      lazy
      onPage={onPageChange}
      first={(page - 1) * rowsPerPage}
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      dataKey="id"
      showGridlines
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column
        header={
          <>
            <Checkbox onChange={onSelectAllChange} checked={isAllSelected} />
            <Button
              icon="pi pi-chevron-down"
              onClick={(e) => overlayPanelRef.current?.toggle(e)} // Use ref to toggle OverlayPanel
              className="p-button-text p-button-rounded p-button-info"
              style={{ marginLeft: "10px" }}
            />
          </>
        }
        body={(rowData) => (
          <Checkbox
            checked={!!selectedRows[rowData.id]}
            onChange={(e) => onRowSelectChange(e, rowData.id)}
          />
        )}
        headerStyle={{ width: "3rem" }}
      />
      <Column
        header="S.No."
        body={(_rowData, { rowIndex }) => <>{rowIndex + 1}</>}
        headerStyle={{ width: "5rem" }}
      />
      <Column field="title" header="Title" sortable />
      <Column field="place_of_origin" header="Place of Origin" sortable />
      <Column field="artist_display" header="Artist Display" sortable />
      <Column field="inscriptions" header="Inscriptions" sortable />
      <Column field="date_start" header="Date Start" sortable />
      <Column field="date_end" header="Date End" sortable />
    </DataTable>
  );
};

export default TableComponent;
