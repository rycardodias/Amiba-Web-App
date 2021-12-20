import { MoreHoriz } from "@mui/icons-material";
import { AvatarGroup, Box, Card, Divider, FormControlLabel, Grid, IconButton, LinearProgress, styled } from "@mui/material";
import AddIconButton from "components/AddIconButton";
import FlexBox from "components/FlexBox";
import MoreOptions from "components/MoreOptions";
import RoundCheckBox from "components/RoundCheckBox";
import { H3, H5, H6, Small, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import useTitle from "hooks/useTitle";
import { useState } from "react";
const StyledAvatar = styled(UkoAvatar)(() => ({
  width: 36,
  height: 36,
  borderColor: "transparent",
  backgroundColor: "transparent"
}));
const RightContentWrapper = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
}));

const ProjectDetails = () => {
  // change navbar title
  useTitle("Project Details");
  const [fileEl, setFileEl] = useState(null);
  const [projectEl, setProjectEl] = useState(null); // -----------------------------------------------------------------------

  const handleProjectMoreOpen = event => {
    setProjectEl(event.currentTarget);
  };

  const handleProjectMoreClose = () => setProjectEl(null); // -----------------------------------------------------------------------


  const handleFileMoreOpen = event => {
    setFileEl(event.currentTarget);
  };

  const handleFileMoreClose = () => setFileEl(null); // -----------------------------------------------------------------------


  return <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <Box padding={3}>
              <FlexBox alignItems="center" justifyContent="space-between">
                <H3 mb={1}>Project Nightfall</H3>
                <IconButton sx={{
                padding: 0
              }} onClick={handleProjectMoreOpen}>
                  <MoreHoriz />
                </IconButton>

                <MoreOptions anchorEl={projectEl} handleMoreClose={handleProjectMoreClose} />
              </FlexBox>
              <Small color="text.disabled">
                Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor ut labore et dolore magna aliqua. elit, sed do eiusmod
                tempor ut labore et dolore magna aliqua. sed do eiusmod tempor
                ut labore.
              </Small>
            </Box>

            <Divider />

            <Box padding={3}>
              <Grid container spacing={3}>
                <Grid item sm={7} xs={12}>
                  <H5 mb={2}>Tasks</H5>
                  {tasks.map(task => <FormControlLabel key={task.title} control={<RoundCheckBox checked={task.status === "Completed"} />} label={<Box>
                          <H6 lineHeight={1} mb={0.3}>
                            {task.title}
                          </H6>
                          <Tiny color="text.disabled" fontWeight={500}>
                            {task.status}
                          </Tiny>
                        </Box>} sx={{
                  margin: 0,
                  width: "100%",
                  alignItems: "flex-start",
                  cursor: "default",
                  paddingBottom: 1.5,
                  "& .MuiCheckbox-root": {
                    padding: 0,
                    paddingRight: 1.2
                  },
                  "&:last-child": {
                    paddingBottom: 0
                  }
                }} />)}
                </Grid>

                <Grid item sm={5} xs={12}>
                  <H5 mb={2}>Team</H5>
                  <AvatarGroup sx={{
                  justifyContent: "flex-end",
                  "& .MuiAvatar-root": {
                    boxSizing: "border-box",
                    border: 0
                  }
                }}>
                    <UkoAvatar alt="Remy Sharp" src="/static/avatar/001-man.svg" />
                    <UkoAvatar alt="Travis Howard" src="/static/avatar/002-girl.svg" />
                    <UkoAvatar alt="Cindy Baker" src="/static/avatar/003-boy.svg" />
                    <AddIconButton className="MuiAvatar-root" />
                  </AvatarGroup>

                  <Box mt={2}>
                    <FlexBox justifyContent="space-between" py={1}>
                      <H6 fontWeight={600}>Project Progress</H6>
                      <H6>32%</H6>
                    </FlexBox>
                    <LinearProgress variant="determinate" value={32} />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Box padding={3}>
              <H5 mb={2}>File Attachment</H5>
              <Grid container spacing={3}>
                {files.map(item => <Grid item sm={6} xs={12} key={item.id}>
                    <FlexBox justifyContent="space-between">
                      <FlexBox alignItems="center">
                        <Box marginRight={1.5} height={40} width={40}>
                          <img src={item.image} alt="File Type" width="100%" />
                        </Box>
                        <Box>
                          <H6>{item.title}</H6>
                          <FlexBox alignItems="center" justifyContent="space-between" maxWidth={90}>
                            <Tiny>3mb</Tiny>
                            <Box width="4px" height="4px" bgcolor="text.disabled" borderRadius={1} />
                            <Tiny>5 days ago</Tiny>
                          </FlexBox>
                        </Box>
                      </FlexBox>

                      <IconButton onClick={handleFileMoreOpen}>
                        <MoreHoriz fontSize="small" color="disabled" />
                      </IconButton>
                    </FlexBox>
                  </Grid>)}

                <MoreOptions anchorEl={fileEl} handleMoreClose={handleFileMoreClose} />
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <RightContentWrapper>
            <Card sx={{
            padding: 3,
            height: "48%"
          }}>
              <H5 mb={2}>Project Tools</H5>

              {projectTools.map(item => <FlexBox alignItems="center" mb={2} key={item.id}>
                  <StyledAvatar alt="Logo" src={item.image} />

                  <Box ml={1.5}>
                    <H6>{item.company}</H6>
                    <Tiny color="text.disabled">{item.position}</Tiny>
                  </Box>
                </FlexBox>)}
            </Card>

            <Card sx={{
            padding: 3,
            height: "48%"
          }}>
              <H5 mb={2}>Project Stack</H5>

              {stacks.map(item => <FlexBox alignItems="center" mb={2} key={item.id}>
                  <StyledAvatar alt="Logo" src={item.image} />
                  <Box ml={1.5}>
                    <H6>{item.company}</H6>
                    <Tiny color="text.disabled">{item.position}</Tiny>
                  </Box>
                </FlexBox>)}
            </Card>
          </RightContentWrapper>
        </Grid>
      </Grid>
    </Box>;
};

const tasks = [{
  title: "Design",
  status: "Completed"
}, {
  title: "Development",
  status: "Ongoing"
}, {
  title: "Back End Development",
  status: "Upcoming"
}];
const files = [{
  id: 1,
  title: "Design Homepage",
  image: "/static/file-type/jpg.svg"
}, {
  id: 2,
  title: "Preliminary Sketches",
  image: "/static/file-type/zip.svg"
}, {
  id: 3,
  title: "Preliminary Sketches",
  image: "/static/file-type/pdf.svg"
}, {
  id: 4,
  title: "Preliminary Sketches",
  image: "/static/file-type/raw.svg"
}];
const projectTools = [{
  id: 1,
  company: "Adobe Illustrator",
  image: "/static/tools-logo/illustrator.svg",
  position: "Design Software"
}, {
  id: 2,
  company: "Sketch",
  image: "/static/tools-logo/sketch.svg",
  position: "Design Software"
}, {
  id: 3,
  company: "Adobe Photoshop",
  image: "/static/tools-logo/photoshop.svg",
  position: "Design Software"
}];
const stacks = [{
  id: 1,
  company: "HTML5",
  image: "/static/tools-logo/html.svg",
  position: "Code"
}, {
  id: 2,
  company: "VueJS",
  image: "/static/tools-logo/vue.svg",
  position: "Code"
}, {
  id: 3,
  company: "Sass",
  image: "/static/tools-logo/sass.svg",
  position: "Code"
}];
export default ProjectDetails;