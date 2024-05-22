import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.success.main
}));

const StatBox = ({ title, subtitle, icon, progress, increase, ...rest }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" {...rest}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <StyledCircularProgress
            variant="determinate"
            value={progress * 100}
            size={50}
            thickness={5}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
