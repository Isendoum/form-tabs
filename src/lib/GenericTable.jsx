import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const GenericTable = ({
   columnsSchema,
   data,
   onRowClick,
   extraActions,
   tableTitle,
}) => {
   return (
      <div>
         <h6>{tableTitle ? tableTitle : null}</h6>
         <>{extraActions ? extraActions : null}</>
         <DataGrid
            onRowClick={onRowClick ? onRowClick : null}
            rows={data}
            columns={columnsSchema || []}
         />
      </div>
   );
};

export default GenericTable;
