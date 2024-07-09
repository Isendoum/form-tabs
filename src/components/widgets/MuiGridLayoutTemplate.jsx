import { Grid } from "@mui/material";

const MuiGridLayoutTemplate = ({ properties, uiSchema }) => {
   const grid = uiSchema["ui:grid"];

   return (
      <Grid container spacing={2}>
         {grid.map((row, rowIndex) => (
            <Grid container item spacing={2} key={rowIndex}>
               {Object.keys(row).map((fieldName) => {
                  const property = properties.find((p) => p.name === fieldName);
                  return (
                     <Grid item xs={row[fieldName]} key={fieldName}>
                        {property?.content}
                     </Grid>
                  );
               })}
            </Grid>
         ))}
      </Grid>
   );
};

export default MuiGridLayoutTemplate;
