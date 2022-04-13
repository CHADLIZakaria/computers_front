import { Button, Center, Flex, IconButton } from '@chakra-ui/react'
import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const Pagination = ({paginate, onClick}) => {
  return (
    // <nav>
    //     <ul className="pagination justify-content-center">
    //         <li className={`page-item ${paginate.page===1 && 'disabled'}`} onClick={() => onClick(1)}>
    //             <span className="page-link" aria-label="Previous">
    //                 <span aria-hidden="true">&laquo;</span>
    //             </span>
    //         </li>
    //         {[...Array(paginate.totalPages).keys()].map(element => 
    //             <li className={`page-item ${element+1===paginate.page && 'active'}`} onClick={() => onClick(element+1)}>
    //                 <span className="page-link">{element+1}</span>
    //             </li>
    //         )}
    //         <li className={`page-item ${paginate.page===paginate.totalPages && 'disabled'}`} onClick={() => onClick(paginate.totalPages)}>
    //             <span className="page-link" aria-label="Next">
    //                 <span aria-hidden="true">&raquo;</span>
    //             </span>
    //         </li>
    //     </ul>
    // </nav>
        <>
            {paginate.totalPages > 1 && 
                <Center>
                    <Flex color='white'>
                        <IconButton
                        variant='outline'
                        colorScheme='blue'
                        mr='1'
                        icon={<MdKeyboardArrowLeft />}
                        onClick={() => onClick(1)}
                        />
                        {[...Array(paginate.totalPages).keys()].map(element => 
                            <Button  variant={`${element+1===paginate.page ? 'solid': 'outline'}`} colorScheme='blue'  mr='1'>{element+1}</Button>
                        )}
                        <IconButton
                            variant='outline'
                            colorScheme='blue'
                            icon={<MdKeyboardArrowRight />}
                            onClick={() => onClick(paginate.totalPages)}
                            />
                    </Flex>
                </Center>
            }
        </>
    )
}

export default Pagination