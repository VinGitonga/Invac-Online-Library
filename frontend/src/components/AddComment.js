import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, FormControl, Button, Stack, useToast } from '@chakra-ui/react';
import { clearState, createBookReview, bookSelector } from '../services/book/bookSlice';
import { userSelector } from '../services/user/userSlice';
import { MdModeEditOutline } from 'react-icons/md'

const AddComment = ({ bookId }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [comment, setComment] = useState('');
    const {
        isFetching, isError, isSuccess, errorMessage
    } = useSelector(bookSelector)

    const userData = useSelector(userSelector);
    const { userInfo } = userData;

    const successMsg = () => {
        toast({
            title: 'Added comment',
            duration: 3000,
            isClosable: true,
            status: 'success',
        })
    }
    const errMsg = () => {
        toast({
            title: 'Added comment',
            description: errorMessage,
            duration: 3000,
            isClosable: true,
            status: 'success',
        })
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            setComment("");
        }

        if (isError) {
            dispatch(clearState());
        }
    }, [isError, isSuccess, dispatch]);

    const clickSubmit = () => {
        const review = {
            comment: comment,
            userId: userInfo._id,
        }

        const data = {
            bookId: bookId,
            bookReview: review
        }

        dispatch(createBookReview(data))
    }

    return (
        <Stack direction="column" spacing={4} mt={"40px"}>
            {isSuccess ? successMsg : null}
            {isError ? errMsg() : null}
            <FormControl id="comment">
                <Input
                    variant={"flushed"}
                    placeholder={userInfo ? "Add Comment" : "Login first to comment."}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    isDisabled={userInfo ? false : true}
                />
            </FormControl>
            <Button
                leftIcon={<MdModeEditOutline />}
                colorScheme="teal"
                variant="solid"
                onClick={clickSubmit}
                isLoading={isFetching}
                loadingText={"Adding comment ..."}
                isDisabled={userInfo ? false : true}
                size={'md'}
                type="submit"
            >
                Comment
            </Button>
        </Stack>
    )
}

export default AddComment;