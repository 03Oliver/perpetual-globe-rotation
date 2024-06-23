import { Box, Link, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box as="footer" py={4} bg="gray.800" color="white">
      <Flex justify="center" align="center">
        <Link as={RouterLink} to="/privacy" mx={2}>
          Privacy
        </Link>
        <Link href="https://www.teleses.ai" mx={2}>
          Team
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;