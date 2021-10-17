import { useToast } from '@chakra-ui/react'


const Notification = ({ title, description = "", status }) => {
    const toast = useToast();

    toast({
        title: title,
        description: description,
        status: status,
        duration: 4000,
        isClosable: true
    })
}

export default Notification;