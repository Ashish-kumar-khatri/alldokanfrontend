import React from 'react'
import {
    Skeleton
} from '@mantine/core';

function CategoriesListSkeleton() {

    function getCategoriesSkeleton(count){
        let skeletons = [];
        for(let i = 0 ; i < count ; i++){
            skeletons.push(<Skeleton key = {i} height = {30} />)
        }

        return skeletons;
    }

  return (
    <>
        {
            getCategoriesSkeleton(10)
        }
    </>
  )
}

export default CategoriesListSkeleton