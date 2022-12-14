import { Skeleton } from '@mantine/core'
import { useWindowSize } from '@react-hook/window-size'
import React from 'react'

function ProductCardSkeleton() {

  const [width] = useWindowSize();

  return (
    <div
        style = {{
            position : "relative",
            height : "100%",
            borderRadius : "10px",
            width : `${width < 800 ? "200px" : "250px"}`,
            display : "flex",
            flexDirection : "column",
            gap : ".5em"
        }}
    >
        <Skeleton height = {width < 800 ? 150 : 200} />
        <Skeleton height = {20} />
        <Skeleton height = {15} width = "80%" />
    </div>
  )
}

export default ProductCardSkeleton