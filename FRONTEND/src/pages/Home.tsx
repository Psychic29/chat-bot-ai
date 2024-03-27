import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnimation from "../Components/typer/TypingAnimation";
import Footer from "../Components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowed = useMediaQuery(theme.breakpoints.down("md"));
  useMediaQuery;
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3
        }}
      >
        <Box>
          <TypingAnimation />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10
          }}
        >
          <img
            src="../../public/robot-home.png"
            alt="robot"
            style={{ width: "200px", margin: "auto" }}
          />
          <img
            className="image-inverted rotate"
            src="openai-logo.png"
            alt="openai"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="../../public/chat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowed ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "5px -5px 105px F#64f3d5",
              marginTop: 20,
              marginBottom: 21
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
