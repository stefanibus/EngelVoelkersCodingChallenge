import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./components/Header";
import List from "./components/List";
import {
    ThemeProvider,
    unstable_createMuiStrictModeTheme,
} from "@material-ui/core/styles";
import "./App.css";

const evTheme = unstable_createMuiStrictModeTheme({
    overrides: {
        MuiCardHeader: {
            root: {
                padding: 15,
                "&:last-child": {
                    paddingBottom: 0,
                },
            },
        },
        MuiCardContent: {
            root: {
                padding: 12,
                "&:last-child": {
                    paddingBottom: 0,
                },
            },
        },
    },
    spacing: 8,
    typography: {
        fontFamily: [" Inter ", " sans-serif "].join(","),
    },
    palette: {
        neutral: {
            main: "#666",
        },
        primary: {
            main: "#ff0000",
        },
        secondary: {
            main: "#000000",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={evTheme}>
            <CssBaseline />
            <div className="App">
                <Container maxWidth="xl">
                    <Header />
                    <List />
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
