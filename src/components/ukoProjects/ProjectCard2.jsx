import { MoreHoriz } from "@mui/icons-material";
import { AvatarGroup, Box, Card, IconButton, LinearProgress } from "@mui/material";
import AddIconButton from "components/AddIconButton";
import FlexBox from "components/FlexBox";
import { H3, H6, Paragraph, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";

const ProjectCard2 = ({
  handleMoreClick
}) => {
  return <Card sx={{
    padding: 2,
    boxShadow: 2
  }}>
      <FlexBox alignItems="center" justifyContent="space-between">
        <Small>July 2, 2020</Small>
        <IconButton sx={{
        padding: 0
      }} onClick={handleMoreClick}>
          <MoreHoriz />
        </IconButton>
      </FlexBox>

      <Box sx={{
      textAlign: "center",
      pt: 6,
      pb: 4
    }}>
        <H3>Web Designing</H3>
        <H6 color="text.disabled" fontWeight={500} mt={0.5}>
          Prototyping
        </H6>
      </Box>

      <FlexBox justifyContent="space-between" py={1}>
        <Paragraph fontWeight={600}>Project Progress</Paragraph>
        <Paragraph fontWeight={600}>32%</Paragraph>
      </FlexBox>

      <LinearProgress variant="determinate" value={32} />

      <FlexBox alignItems="center" justifyContent="space-between" pt="1.5rem">
        <FlexBox alignItems="center">
          <AvatarGroup>
            <UkoAvatar alt="Remy Sharp" src="/static/avatar/001-man.svg" />
            <UkoAvatar alt="Travis Howard" src="/static/avatar/002-girl.svg" />
          </AvatarGroup>
          <AddIconButton sx={{
          marginLeft: 0
        }} />
        </FlexBox>

        <Small sx={{
        backgroundColor: "divider",
        padding: "5px 15px",
        borderRadius: "20px",
        marginLeft: 1,
        color: "text.disabled",
        fontWeight: 600
      }}>
          3 Weeks Left
        </Small>
      </FlexBox>
    </Card>;
};

export default ProjectCard2;