import React from "react"
import {
   useBoolean,
   Image
} from "@chakra-ui/react"
import { TOAST_STATUSES } from "../../../redux/constants/global";
import { showToast } from "../../../redux/actions/global";
import { useDispatch } from "react-redux";

const NFTImage = ({
   handleSelectAdd,
   handleSelectDelete,
   selectedList,
   setSelectedList,
   nftItem,
}) => {
   var [selected, setSelected] = useBoolean();
   const dispatch = useDispatch();

   return (
      <Image
         cursor={'pointer'}
         src={nftItem.imageURL}
         fit={'cover'}
         overflow={'hidden'}
         borderRadius={'6px'}
         width={'200px'}
         height={'200px'}
         border={selected ? '5px var(--chakra-colors-primary-400) solid' : '2px rgba(200, 200, 200, 0.6) solid'}
         onClick={() => {
            if (selectedList.length < 3 || (selectedList.length === 3 && selected === true)) {
               setSelected.toggle();
               if (!selected === true) {
                  handleSelectAdd(selectedList, nftItem, setSelectedList);
               }
               else {
                  handleSelectDelete(selectedList, nftItem, setSelectedList);
               }
            }
            if (selectedList.length === 3 && selected === false) {
               dispatch(showToast(TOAST_STATUSES.ERROR, "Select a maximum of three NFTs"));
            }
         }}
      />
   )
}

export default NFTImage;