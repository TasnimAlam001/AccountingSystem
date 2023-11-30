import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaPlus, FaServer, FaSignOutAlt } from "react-icons/fa";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet, useLocation } from "react-router-dom";


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const Navbar = () => {
    const theme = useTheme();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [showGroupButton, setShowGroupButton] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        // Hide the "Group" button when closing the drawer
        setShowGroupButton(false);
    };

    const handleSettingsClick = () => {
        // Toggle the state to show/hide the "Group" button
        setShowGroupButton(!showGroupButton);
    };

    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position='fixed' open={open} sx={{ backgroundColor: 'skyblue', color: 'black' }}>
                    <Toolbar className='flex justify-between'>
                        <div>
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                onClick={handleDrawerOpen}
                                edge='start'
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <div className='justify-end '>
                            <Typography noWrap component='div'>
                                <div className=' flex gap-5 '>
                                    <Link to="/">Home</Link>
                                    <p className='cursor-pointer'>Accounts</p>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <span>
                                            <FaSignOutAlt />
                                        </span>{' '}
                                        Log Out
                                    </div>
                                    <p className='flex items-center gap-2 cursor-pointer'>
                                        <FaServer /> Modules
                                    </p>
                                </div>
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} >
                    <DrawerHeader sx={{ backgroundColor: 'skyblue', color: 'black' }}>
                        {open && (
                            <div className="flex flex-col m-2">
                                <div className="avatar mx-auto m-4">
                                    <div className="w-16 rounded-full ">
                                        <img src="https://i.ibb.co/QP0KxWC/Tasnim-Alam.jpg" />
                                    </div>
                                </div>
                                <div>
                                    <div className="">
                                        <h2>OmniSolutionLtd</h2>
                                    </div>
                                </div>
                            </div>
                        )}
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />

                    <List>
                        {["Settings"].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: "block" }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                    }}
                                    onClick={handleSettingsClick}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {index % 2 === 0 ? <FaPlus  onClick={handleDrawerOpen}/> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {showGroupButton && (
                            <ListItem disablePadding sx={{ display: "block" }}>
                                <ListItemButton
                                    component={Link}
                                    to="/home"
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                    }}
                                >
                                    {/* No icon before the "Group" button */}
                                    <ListItemText
                                        primary="Group Entry"
                                        sx={{ opacity: open ? 1 : 0, paddingLeft: '4px' }}
                                    />
                                </ListItemButton>
                            </ListItem>

                        )}
                    </List>

                    <Divider />
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3}}>
                    <DrawerHeader />

                    <Typography paragraph>
                        {location.pathname === "/" && <p className="text-2xl">Welcome to Accounting System</p>}
                        <div className="">
                            <Outlet></Outlet>
                        </div>

                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default Navbar;