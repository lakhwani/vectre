import ContentWithSideButtons from "../../components/Containers/ContentWithSideButtons";
import ProfileCommunityDetails from "./ProfileCommunityDetails/ProfileCommunityDetails"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    communitySelector,
    loggedInUserRolesSelector,
} from "../../redux/selectors/communities";
import { Box, Flex, Stack } from "@chakra-ui/react";
import PostComponent from "../PostComponent/PostComponent";
import TextButton from "../Buttons/TextButton/TextButton";
import {
    feedSelector,
    feedIndexSelector,
    feedPaginationCompleteSelector,
    feedSortTypeSelector
} from "../../redux/selectors/feed";
import { getCommunityFeed } from "../../redux/actions/feed";
import CreatePostComponent from "../CreatePostComponent/CreatePostComponent";
import { getCommunity, getRolesOfLoggedInUser } from "../../redux/actions/communities";

const communitySideButtonsList = (userIsModerator) => [
    {
        hidden: userIsModerator,
        text: "Create a Proposal",
        func: () => { console.log("Creating a proposal...") }
    },
    {
        text: "Vote for a Proposal",
        func: () => { console.log("Voting for a proposal...") }
    },
    {
        hidden: userIsModerator,
        text: "Moderator Settings",
        link: "settings"
    },
    {
        text: "Announcements",
        func: () => { console.log("anouncements") }
    }
]

const Community = ({
    communityID
}) => {
    const dispatch = useDispatch();
    const communityData = useSelector(communitySelector)
    const loggedInUserRoles = useSelector(loggedInUserRolesSelector);

    useEffect(() => {
        dispatch(getRolesOfLoggedInUser(communityID));
        dispatch(getCommunity(communityID));
    }, []);


    const feed = useSelector(feedSelector)
    const feedIndex = useSelector(feedIndexSelector)
    const feedPaginationComplete = useSelector(feedPaginationCompleteSelector)
    const feedSortType = useSelector(feedSortTypeSelector)

    function loadFeed() {
        dispatch(getCommunityFeed(communityID, feedIndex, feedSortType))
    }
    useEffect(() => {
        loadFeed()
    }, [feedSortType])

    return (
        <>
            <base href={`/c/${communityID}/`} />
            <ContentWithSideButtons sideButtonsList={loggedInUserRoles.includes("member") ? communitySideButtonsList(
                !loggedInUserRoles.includes("moderator")
            ) : []}>
                <ProfileCommunityDetails communityData={communityData} />
                <Stack
                    mt={"15px"}
                    gap={"10px"}>
                    {
                        loggedInUserRoles.includes("member") ? <CreatePostComponent communityID={communityID} /> : null
                    }
                    {feed.map((item, i) => {
                        return (
                            <Box key={i}>
                                <PostComponent item={item} fromFeed={true} />
                            </Box>
                        )
                    })}
                </Stack>
                {feed.length === feedIndex && !feedPaginationComplete ?
                    (
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            height={'80px'}
                        >
                            <TextButton
                                text={'Load more'}
                                onClick={loadFeed} />
                        </Flex>
                    )
                    : null}
            </ContentWithSideButtons>
        </>
    )
}

export default Community;