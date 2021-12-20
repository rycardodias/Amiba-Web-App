import { Flag, MoreHoriz } from "@mui/icons-material";
import { AvatarGroup, Card, IconButton, LinearProgress } from "@mui/material";
import AddIconButton from "components/AddIconButton";
import FlexBox from "components/FlexBox";
import { H3, Paragraph, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";

const ProjectCard = ({
  handleProjectMoreOpen
}) => {
  return <Card sx={{
    padding: "1rem 1.5rem"
  }}>
      <FlexBox alignItems="flex-end" justifyContent="space-between">
        <H3>Uko Dashboard</H3>
        <IconButton sx={{
        padding: 0
      }} onClick={handleProjectMoreOpen}>
          <MoreHoriz />
        </IconButton>
      </FlexBox>

      <FlexBox alignItems="center" marginTop={1}>
        <Flag sx={{
        color: "text.disabled",
        marginRight: 1
      }} />
        <Small fontWeight={500} color="text.disabled">
          Due on Nov 3
        </Small>
      </FlexBox>

      <Paragraph fontSize={12} fontWeight={500} my={3} lineHeight={1.8}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam
      </Paragraph>

      <FlexBox justifyContent="space-between" py={1}>
        <Paragraph fontWeight={600}>Project Progress</Paragraph>
        <Paragraph fontWeight={600}>32%</Paragraph>
      </FlexBox>

      <LinearProgress variant="determinate" value={32} />

      <FlexBox alignItems="center" justifyContent="space-between" pt={3}>
        <FlexBox alignItems="center">
          <AvatarGroup>
            <UkoAvatar alt="Remy Sharp" src="/static/avatar/001-man.svg" />
            <UkoAvatar alt="Travis Howard" src="/static/avatar/002-girl.svg" />
            <UkoAvatar alt="Cindy Baker" src="/static/avatar/003-boy.svg" />
          </AvatarGroup>
          <Small ml={1}>+ 15 people</Small>
        </FlexBox>

        <AddIconButton onClick={e => console.log(e.target.value)} />
      </FlexBox>
    </Card>;
};

export default ProjectCard;