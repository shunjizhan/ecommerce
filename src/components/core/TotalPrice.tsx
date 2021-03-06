import React, { FC, useEffect } from "react"
import { CartItem } from "../../helpers/cart"
import { Typography } from "antd"

const { Title } = Typography

interface Props {
  cart: CartItem[]
  setTotalPrice: (price: number) => void
}

const TotalPrice: FC<Props> = ({ cart, setTotalPrice }) => {
  const getTotalPrice = () => {
    return cart
      .reduce((total, val) => {
        return (total += val.price * val.count)
      }, 0)
      .toFixed(2)
  }

  useEffect(() => {
    setTotalPrice(parseFloat(getTotalPrice()))
  }, [cart])

  return <Title level={5}>商品总价: { getTotalPrice() }</Title>
}

export default TotalPrice
