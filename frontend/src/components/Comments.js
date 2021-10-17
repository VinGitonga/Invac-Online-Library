import { Box, Stack, Avatar, Text, } from '@chakra-ui/react'
import moment from 'moment'

const Comments = ({reviews}) => {

    return (
        <Box>
            {reviews.map((review)=> (
                <Stack mt={6} direction="row" spacing={4} align={'center'} key={review._id}>
                    <Avatar
                        src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                        alt={'comment'}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>{review.userId.name} · {moment(review.addedAt).format('LL')} · {moment(review.addedAt).format('h:mma')}</Text>
                        <Text color={'gray.600'}>{review.comment}</Text>
                    </Stack>
                </Stack>
            ))}
        </Box>
    )
}



export default Comments;