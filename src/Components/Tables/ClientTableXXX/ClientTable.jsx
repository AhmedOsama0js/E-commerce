import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function ClientTable() {
  const globalStat = useSelector((state) => state);
  const data = globalStat.client;

  const columns = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Client",
        flex: 1,
        Cell: ({ row }) => (
          <div className="action-btn">
            <img
              alt="avatar"
              height={30}
              src={row?.original?.image}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
            <h5>{row?.original?.name}</h5>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        flex: 1,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        flex: 1,
      },
      {
        accessorKey: "payment_method",
        header: "Payment Method",
        flex: 1,
      },
      {
        accessorKey: "amount_spent",
        header: "Amount Spent",
        flex: 1,
        Cell: ({ row }) => <span>{`${row?.original.amount_spent}$`}</span>,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
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
    <ThemeProvider theme={darkTheme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
}
