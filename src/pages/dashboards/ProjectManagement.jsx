import { Box, Grid } from "@mui/material";
import RecentProjects from "components/Dashboards/projectManagement/RecentProjects";
import TeamProgress from "components/Dashboards/projectManagement/TeamProgress";
import TodoList from "components/Dashboards/projectManagement/TodoList";
import TotalProject from "components/Dashboards/projectManagement/TotalProject";
import Footer from "components/Dashboards/saas/Footer";
import useTitle from "hooks/useTitle";

const ProjectManagement = () => {
  // change navbar title
  useTitle("Project Management");
  return <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={7} xs={12}>
          <RecentProjects />
          <Box mt={3} />
          <TeamProgress />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <TotalProject />
          <Box height={24} />
          <TodoList />
        </Grid>

        <Grid item xs={12}>
          <Footer imageLink="/static/illustration/project-management-dashboard.svg" />
        </Grid>
      </Grid>
    </Box>;
};

export default ProjectManagement;