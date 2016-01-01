import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";

import LearningDeskPage from "./LearningDeskPage/LearningDeskPage";

import "./LearningDesk.css";

export default function LearningDesk() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <section className="learning-desk-page">
      <aside className="learning-desk-aside">
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
              <ListItemText
                primary={
                  <FormattedMessage
                    id="learning_desk"
                    defaultMessage="Learning desk"
                  />
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
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <FormattedMessage id="my_class" defaultMessage="My class" />
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </aside>
      <section>
        {selectedIndex === 0 && <LearningDeskPage />}
        {selectedIndex === 1 && <p>my class</p>}
      </section>
    </section>
  );
}
