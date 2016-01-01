import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import TaskIcon from "@mui/icons-material/Task";

import "./AdminPanel.css";
import AdminPanelModules from "./AdminPanelModules/AdminPanelModules";

export default function AdminPanel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <section className="adminPanel-page">
      <aside className="adminPanel-aside">
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          aria-label="contacts"
        >
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Modules" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <MailOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
        </List>
      </aside>
      <section>
        {selectedIndex === 0 && <AdminPanelModules />}
        {selectedIndex === 1 && <p>Courses</p>}
        {selectedIndex === 2 && <p>messages</p>}
      </section>
    </section>
  );
}
