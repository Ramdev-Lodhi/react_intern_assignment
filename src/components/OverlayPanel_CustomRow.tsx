import React from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

interface OverlayPanelData {
  overlayRef: React.RefObject<OverlayPanel>;
  selectCount: number;
  totalRecords: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const OverlayPanel_SelectRow: React.FC<OverlayPanelData> = ({
  overlayRef,
  selectCount,
  totalRecords,
  onChange,
  onSubmit,
}) => {
  return (
    <OverlayPanel ref={overlayRef}>
      <div>
        <input
          type="number"
          value={selectCount}
          onChange={onChange}
          min="1"
          max={totalRecords}
          placeholder="Select Rows.."
          style={{ width: "100%" }}
        />
        <Button
          label="Submit"
          icon="pi pi-check"
          onClick={onSubmit}
          style={{ marginTop: "10px" }}
        />
      </div>
    </OverlayPanel>
  );
};

export default OverlayPanel_SelectRow;
