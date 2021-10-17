import { Box, Spinner } from '@chakra-ui/react';

const Loader = () => (
    <Box
       top={"50%"}
       left={"50%"}
       w={"300px"}
       transform={"translateX(-50%)"}
    >
        <Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
        />
    </Box>
)

// position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 300px;
//   text-align:center;
//   transform: translateX(-50%);

export default Loader;