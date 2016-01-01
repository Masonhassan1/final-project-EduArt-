import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import AdminPanelModules from "./AdminPanelModules/AdminPanelModules";
import AdminPanelCourses from "./AdminPanelCourses/AdminPanelCourses";

import "./AdminPanel.css";

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
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <FormattedMessage id="modules" defaultMessage="Modules" />
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <FormattedMessage id="courses" defaultMessage="Courses" />
                }
              />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <MailOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem> */}
        </List>
      </aside>
      <section>
        {selectedIndex === 0 && <AdminPanelModules />}
        {selectedIndex === 1 && <AdminPanelCourses />}
      </section>
    </section>
  );
}
