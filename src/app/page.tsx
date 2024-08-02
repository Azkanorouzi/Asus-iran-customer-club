import { Box, Typography } from "@mui/material";

export default async function landingPage() {
  return (
    <Box
      zIndex={10}
      display={"flex"}
      justifyContent={"center"}
      alignItems="center"
      width={"100vw"}
      marginRight={"170px"}
    >
      <Typography variant="h1" component={"h1"}>
        Hi Asus iran
      </Typography>
    </Box>
  );
}
