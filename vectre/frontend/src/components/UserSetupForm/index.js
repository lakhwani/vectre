import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    Flex,
    Text,
    Textarea
} from "@chakra-ui/react";

import { FaUser } from 'react-icons/fa'
import React, { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

const UserSetupForm = ({ isOpen, onClose, onOpen, walletAddress, dispatch, createUser, create }) => {
    const toast = useToast()

    useEffect(() => {
        if (create.response.success === false) {
            console.log("create failed!")
            toast({
                title: create.response.error.includes("username") ? create.response.message + " (Username taken)" : create.response.error,
                status: 'error',
                position: 'bottom',
                isClosable: true
            })
        }
        else if (create.response.success === true) {
            console.log("create success!")
            toast({
                title: create.response.message,
                status: 'success',
                position: 'bottom',
                isClosable: true
            })
        }
    }, [create, toast])

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                color={'primary.400'}
                size={'3xl'}>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    py={'40px'}>
                    <ModalHeader
                        px={{ base: '24px', md: '64px' }}>
                        <ModalCloseButton
                            color={'primary.400'}
                            top={4}
                            left={4}
                            transform={'scale(1.8)'}
                            _focus={{ outline: 0 }}
                            _hover={{ background: 'white' }}
                            _active={{ background: 'white' }}
                        />
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            color={'primary.400'}
                        >
                            <Text
                                fontWeight={700}
                                fontSize="28px"
                                mr="15px">
                                Register User
                            </Text>
                            <FaUser size={'2rem'} />
                        </Flex>
                    </ModalHeader>

                    <ModalBody
                        px={{ base: '24px', md: '64px' }}>
                        <form
                            id="setup-form"
                            onSubmit={(event) => {
                                event.preventDefault();
                                let new_user = {
                                    name: event.target.name.value,
                                    username: event.target.username.value,
                                    bio: event.target.bio.value,
                                    wallet_address: walletAddress
                                }
                                dispatch(createUser(new_user));
                                onClose();
                                // toast({
                                //     title: `error toast`,
                                //     status: create.response.message,
                                //     isClosable: true,
                                // })
                            }}
                        >
                            <FormControl
                                isRequired
                                pt={'12px'}>
                                <FormLabel
                                    htmlFor='name'
                                    color={'primary.400'}
                                    fontWeight={700}
                                    fontSize={'20px'}
                                    mb={'3px'}>
                                    Name:
                                </FormLabel>
                                <Input
                                    id='name'
                                    placeholder='what is your name good ser?'
                                    fontSize={'18px'}
                                    bg={'rgba(198, 219, 255, 0.32)'}
                                    border={'none'}
                                    _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
                            </FormControl>
                            <FormControl
                                isRequired
                                pt={'24px'}>
                                <FormLabel
                                    htmlFor='username'
                                    color={'primary.400'}
                                    fontWeight={700}
                                    fontSize={'20px'}
                                    mb={'3px'}>
                                    Username:
                                </FormLabel>
                                <Input
                                    id='username'
                                    placeholder='@username?'
                                    fontSize={'18px'}
                                    bg={'rgba(198, 219, 255, 0.32)'}
                                    border={'none'}
                                    _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
                            </FormControl>
                            <FormControl
                                pt={'24px'}>
                                <FormLabel
                                    htmlFor='bio'
                                    color={'primary.400'}
                                    fontWeight={700}
                                    fontSize={'20px'}
                                    mb={'3px'}>
                                    Bio:
                                </FormLabel>
                                <Textarea
                                    id='bio'
                                    placeholder='i love me a good bio.&#13;&#10;love any projects?&#13;&#10;part of any communities?'
                                    fontSize={'18px'}
                                    bg={'rgba(198, 219, 255, 0.32)'}
                                    border={'none'}
                                    resize={'none'}
                                    size={'md'}
                                    minHeight={'140px'}
                                    _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter
                        pt={'24px'}
                        px={{ base: '24px', md: '64px' }}>
                        <FormControl isReadOnly>
                            <FormLabel
                                htmlFor='wallet_address'
                                color={'primary.400'}
                                fontWeight={700}
                                fontSize={'20px'}
                                mb={'3px'}>
                                Wallet Address:
                            </FormLabel>
                            <Input
                                id='wallet_address'
                                placeholder={walletAddress}
                                fontSize={'18px'}
                                bg={'rgba(198, 219, 255, 0.32)'}
                                border={'none'}
                                _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
                        </FormControl>
                        <Button
                            type={"submit"}
                            form={"setup-form"}
                            alignSelf={'end'}
                            ml={'32px'}
                            background={'primary.400'}
                            color={'white'}
                            px={'46px'}
                            py={'11px'}
                            borderRadius={'6px'}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserSetupForm;