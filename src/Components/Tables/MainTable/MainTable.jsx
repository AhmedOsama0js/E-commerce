import React, { useState, useCallback } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import MainBtn from "../../Buttons/MainBtn/MainBtn";
import { MdOutlineAdd } from "react-icons/md";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainModel from "../../../Model/mainModel/MainModel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const MainTable = ({ data, columns, form }) => {
  const [model, setModel] = useState(false);

  const handleCreateClick = useCallback(() => {
    setModel((prevModel) => !prevModel);
  }, [setModel]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableStickyHeader: true,
    initialState: {
      columnPinning: {
        right: ["actions"],
      },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <MainBtn
        btn={
          <MdOutlineAdd className="mainBtnIcon" onClick={handleCreateClick} />
        }
      />
    ),
    // renderRowActionMenuItems: ({ table }) => (
    //   <div>
    //     <MainBtn btn={<MdOutlineAdd onClick={handleCreateClick} />} />
    //     <MainBtn btn={<MdOutlineAdd onClick={handleCreateClick} />} />
    //   </div>
    // ),
    muiLinearProgressProps: {
      sx: {
        padding: "10px",
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: "calc(100vh - 210px)",
        minWidth: "fit-contain",
        overflow: "scroll",
      },
    },
    muiTableHeadProps: {
      sx: {
        textAlign: "center",
        padding: "20px",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid rgb(0, 0, 0, 0.54)",
        padding: "4px",
        justifyContent: "center",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgb(0, 0, 0, 0.54)",
        padding: "4px",
        textAlign: "center",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
      {model && <MainModel setModel={setModel} content={form} />}
    </>
  );
};

export default MainTable;
