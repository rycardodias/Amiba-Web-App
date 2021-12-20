import { Add } from "@mui/icons-material";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Card, Grid, styled, Tab, useMediaQuery } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { H2, H6, Small } from "components/Typography";
import ProjectCard3 from "components/ukoProjects/ProjectCard3";
import useTitle from "hooks/useTitle";
import React, { useState } from "react";
import CreateProject from "../../components/ukoProjects/CreateProject"; // styled component

const TopAreaWrapper = styled(Card)(({
  theme
}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  flexWrap: "wrap",
  [theme.breakpoints.down(700)]: {
    "& h2": {
      paddingTop: "1rem"
    },
    "& img": {
      display: "none"
    }
  }
}));
const StyledTabList = styled(TabList)(({
  theme
}) => ({
  "& .MuiTabs-flexContainer .MuiButtonBase-root": {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderBottom: "2px solid",
    borderColor: theme.palette.divider
  },
  "& .MuiTabs-flexContainer .Mui-selected": {
    color: theme.palette.text.primary
  },
  [theme.breakpoints.down(1064)]: {
    maxWidth: 600
  },
  [theme.breakpoints.between(700, 838)]: {
    maxWidth: 475
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 320
  }
}));

const UkoProjectV3 = () => {
  // change navbar title
  useTitle("Uko Project V3");
  const [value, setValue] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"));

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const filterList = projectList.filter(item => value === "all" || item.status === value);
  return <Box pt={2} pb={4}>
      <TopAreaWrapper>
        <Box>
          <H2 paddingLeft={3} paddingBottom={1}>
            Uko Projects
          </H2>
          <TabContext value={value}>
            <StyledTabList variant="scrollable" onChange={handleChange}>
              {tabItems.map(item => <Tab disableRipple key={item.title} value={item.title.split(" ").join("-").toLowerCase()} label={<FlexBox alignItems="center">
                      <H6>{item.title}</H6>
                      <Small sx={{
                backgroundColor: "divider",
                padding: "0px 10px",
                borderRadius: "10px",
                marginLeft: 1
              }}>
                        {item.amount}
                      </Small>
                    </FlexBox>} />)}
            </StyledTabList>
          </TabContext>
        </Box>
        <Box padding="0.5rem 1rem">
          <img alt="UKO Projects" src="/static/illustration/uko-project-v1.svg" />
        </Box>
      </TopAreaWrapper>

      <Grid container spacing={3} paddingTop={3}>
        <Grid item xs={12}>
          <FlexBox justifyContent="space-between" flexWrap="wrap">
            <SearchInput placeholder="Find Projects" sx={{
            maxWidth: downSM ? "100%" : 270,
            marginBottom: downSM ? 1 : 0
          }} />
            <Button fullWidth={downSM} variant="contained" startIcon={<Add />} onClick={() => setOpenModal(true)} sx={{
            fontSize: 12
          }}>
              Create a project
            </Button>

            <CreateProject open={openModal} setOpen={setOpenModal} />
          </FlexBox>
        </Grid>

        {filterList.map((item, index) => <Grid item xs={12} sm={6} md={4} key={index}>
            <ProjectCard3 project={item} />
          </Grid>)}
      </Grid>
    </Box>;
};

const tabItems = [{
  title: "All",
  amount: 45
}, {
  title: "In Progress",
  amount: 12
}, {
  title: "Upcoming",
  amount: 12
}, {
  title: "Blocked",
  amount: 12
}, {
  title: "Completed",
  amount: 12
}];
const projectList = [{
  name: "Project Nightfall",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
  thumbnail: "/static/thumbnail/thumbnail-1.png",
  teamMember: ["/static/avatar/010-girl-1.svg", "/static/avatar/011-man-2.svg"],
  status: "in-progress"
}, {
  name: "Project Nightfall",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
  thumbnail: "/static/thumbnail/thumbnail-2.png",
  teamMember: ["/static/avatar/013-woman-3.svg", "/static/avatar/012-woman-2.svg"],
  status: "upcoming"
}, {
  name: "Project Nightfall",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
  thumbnail: "/static/thumbnail/thumbnail-3.png",
  teamMember: ["/static/avatar/014-man-3.svg", "/static/avatar/015-woman-4.svg"],
  status: "blocked"
}, {
  name: "Project Nightfall",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
  thumbnail: "/static/thumbnail/thumbnail-4.png",
  teamMember: ["/static/avatar/016-boy-2.svg", "/static/avatar/017-girl-2.svg"],
  status: "completed"
}, {
  name: "Project Nightfall",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
  thumbnail: "/static/thumbnail/thumbnail-5.png",
  teamMember: ["/static/avatar/018-boy-3.svg", "/static/avatar/019-woman-5.svg"],
  status: "in-progress"
}, {
  name: "Project Nightfall",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
  thumbnail: "/static/thumbnail/thumbnail-6.png",
  teamMember: ["/static/avatar/020-man-4.svg", "/static/avatar/021-girl-3.svg"],
  status: "completed"
}];
export default UkoProjectV3;