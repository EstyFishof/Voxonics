<template>
    <div>
      <table class="data-table">
        <thead>
          <tr class="data-table-header">
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Coment</th>
            <th><!--culomn phone status-->></th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td class="text">{{ userAgentPanel.callsData.cid }}</td>
            <td>{{ callsData.firstName }}</td>
            <td>{{ callsData.lastName }}</td>
            <td>{{ callsData.phoneNumber }}</td>
            <td>{{ callsData.contactStatus }}</td>
            <td>{{ callsData.comment }}</td>
            <td>{{ callsData.iconCall }}</td>

          </tr>
        </tbody>
      </table>
    </div>
  </template> 
  
  <script>
  export default {
    data() {
      return {
        rows: [
          { col1: 'Row 1 Data 1', col2: 'Row 1 Data 2', col3: 'Row 1 Data 3' },
          { col1: 'Row 2 Data 1', col2: 'Row 2 Data 2', col3: 'Row 2 Data 3' },
          // Add more rows as needed
        ],
      };
    },
  };
  </script>



    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
</script> -->