import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        // primary: {
        //   main: '#263238',
        // },
        // secondary: {
        //   main: '#263238',
        // },
        background: {
            default: '#263238',
            paper: '#263238',
        },
    },
});

const AgentsTable = () => {
    function createData(AgentName, Role, AgentId, Status, Duration, AVGTalkingTime, Calls) {
        return { AgentName, Role, AgentId, Status, Duration, AVGTalkingTime, Calls };
    }

    const rows = [
        createData('abc', "admin", "123456789", "Waiting", 2.48, "2m 3s", 91),
        createData('def', "Agent", "987654321", "Talking", 7.41, "2m 3s", 28),
        createData('ghi', "Admin", "456123789", "Paused", 6.0, "2m 3s", 4),
        createData('jkl', "Agent", "159264873", "In Disposition", 5.3, "2m 3s", 7),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 39),
        createData('pqr', "Admin", "852963741", "Waiting", 3.0, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
        createData('mno', "Agent", "753428619", "Talking", 1.9, "2m 3s", 65),
    ];
    const rowsHeadArr = ["AgentName", "Role", "AgentId", "Status", "Duration", "AVGTalkingTime", "Calls", "Actions"];
    const ActionsArr = ["SPY", "WHISPER", "MERGE"];

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <TableContainer sx={{ maxHeight: '100vh' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={rowsHeadArr.length} align='center' sx={{ fontWeight: 'bold', fontSize: '20px' }}>Agents waiting for a call</TableCell>
                        </TableRow>
                        <TableRow>
                            {rowsHeadArr.map((rowHead, index) => (
                                <TableCell align='center' key={index}>{rowHead}{<MdOutlineKeyboardArrowDown />}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.filter(row => row.Status === "Waiting").map((row, index) => (
                            <TableRow key={index}>
                                {rowsHeadArr.map((head, idx) => (
                                    <TableCell sx={{ textAlign: 'center' }} key={idx}>{row[head]}</TableCell>
                                ))}

                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { m: 1 } }}>
                                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                                            {ActionsArr.map((action, actionIndex) => (
                                                <Button disabled={row.Role === 'Admin'} key={actionIndex}>{action}</Button>
                                            ))}
                                        </ButtonGroup>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TableRow
                // sx={{ backgroundColor: '#37474f' }}
                >

                    <TableCell colSpan={rowsHeadArr.length + 1} sx={{
                        borderBottom: 'none', display: 'flex', flexDirection: 'row',
                        backgroundColor: '#37474f', padding: '6px', alignItems: 'center', '& > *': { ml: 2 }
                    }}>


                        <TableCell colSpan={rowsHeadArr.length} align='left' sx={{ fontWeight: 'bold', backgroundColor: '#37474f', padding: '6px' }}>Filter by:</TableCell>

                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', '& > *': { ml: 2 } }}>

                            {/* <Button variant="contained" size="small" sx={{ textTransform: 'none', backgroundColor: '#455a64', color: 'white', ml: 2, '& .MuiButton-endIcon': { color: '#01579b' } }}> */}
                            <Button variant="contained" size="small" sx={{ textTransform: 'none', backgroundColor: '#455a64', color: 'white' }}>
                                Agent Name
                                <MdOutlineKeyboardArrowDown sx={{ color: '#01579b' }} />
                            </Button>
                            <Button variant="contained" size="small" sx={{ textTransform: 'none', backgroundColor: '#455a64', color: 'white', ml: 2 }}>
                                Role
                                <MdOutlineKeyboardArrowDown sx={{ color: '#01579b' }} />
                            </Button>
                            <Button variant="contained" size="small" sx={{ textTransform: 'none', backgroundColor: '#455a64', color: 'white', ml: 2 }}>
                                Status
                                <MdOutlineKeyboardArrowDown sx={{ color: '#01579b' }} />
                            </Button>
                            <Button variant="contained" size="small" sx={{ textTransform: 'none', backgroundColor: '#455a64', color: 'white', ml: 2 }}>
                                Avg. Talking Time
                                <MdOutlineKeyboardArrowDown sx={{ color: '#01579b' }} />
                            </Button>
                        </Box>
                    </TableCell>
                </TableRow>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {rowsHeadArr.map((rowHead, index) => (
                                <TableCell align='center' key={index}>{rowHead}{<MdOutlineKeyboardArrowDown />}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.filter(row => row.Status !== "Waiting").map((row, index) => (
                            <TableRow key={index}>
                                {rowsHeadArr.map((head, idx) => (
                                    <TableCell sx={{ textAlign: 'center' }} key={idx}>{row[head]}</TableCell>
                                ))}

                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { m: 1 } }}>
                                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                                            {ActionsArr.map((action, actionIndex) => (
                                                <Button disabled={row.Role === 'Admin'} key={actionIndex}>{action}</Button>
                                            ))}
                                        </ButtonGroup>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}

export default AgentsTable;
