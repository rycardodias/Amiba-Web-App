import { Box, Divider } from "@mui/material";
import { H1, Paragraph } from "components/Typography";
import useTitle from "hooks/useTitle";

/// styled components
const Privacy = () => {
  // change navbar title
  useTitle("Privacy");
  return <Box py={4}>
      <H1 fontSize={36} fontWeight={800} textAlign="center">
        Privacy Policy
      </H1>

      <Divider sx={{
      my: 4
    }} />

      <Paragraph lineHeight={2} textAlign="justify">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomized words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text. All the Lorem Ipsum
        generators on the Internet tend to repeat predefined chunks as
        necessary, making this the first true generator on the Internet. It uses
        a dictionary of over 200 Latin words, combined with a handful of model
        sentence structures, to generate Lorem Ipsum which looks reasonable. The
        generated Lorem Ipsum is therefore always free from repetition, injected
        humour, or non-characteristic words etc. There are many variations of
        passages of Lorem Ipsum available, but the majority have suffered
        alteration in some form, by injected humour, or randomized words which
        don't look even slightly believable. If you are going to use a passage
        of Lorem Ipsum, you need to be sure there isn't anything embarrassing
        hidden in the middle of text. All the Lorem Ipsum generators on the
        Internet tend to repeat predefined chunks as necessary, making this the
        first true generator on the Internet. It uses a dictionary of over 200
        Latin words, combined with a handful of model sentence structures, to
        generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
        is therefore always free from repetition, injected humour, or
        non-characteristic words etc.
      </Paragraph>

      <H1 mt={4}>Who We Are and How To Contact Us</H1>
      <Paragraph lineHeight={2} textAlign="justify">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomized words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text. All the Lorem Ipsum
        generators on the Internet tend to repeat predefined chunks as
        necessary, making this the first true generator on the Internet.
      </Paragraph>
      <Paragraph mt={2} lineHeight={2} textAlign="justify">
        If you have reason to believe that a child under the age of 16 has
        provided personal data to Vercel through the Platform, please contact
        privacy@vercel.com and we will endeavor to delete that information from
        our databases.
      </Paragraph>

      <H1 mt={4}>Children's Privacy</H1>
      <Paragraph lineHeight={2} textAlign="justify">
        Vercel does not knowingly collect information from children under the
        age of 16. If you are under the age of 16, please do not submit any
        personal data through the Platform. We encourage parents and legal
        guardians to monitor their children's Internet usage and to help enforce
        our Privacy Policy by instructing their children never to provide
        personal data on our Platform without their permission.
      </Paragraph>

      <Paragraph mt={2} lineHeight={2} textAlign="justify">
        If you have reason to believe that a child under the age of 16 has
        provided personal data to Vercel through the Platform, please contact
        privacy@vercel.com and we will endeavor to delete that information from
        our databases.
      </Paragraph>
    </Box>;
};

export default Privacy;