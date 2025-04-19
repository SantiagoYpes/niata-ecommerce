import React, { ChangeEvent, ReactElement } from 'react'
import { CartItemType } from '../context/CartProvider'
import { ReducerAction } from '../context/CartProvider'
import { ReducerActionType } from '../context/CartProvider'

type PropsType ={
    item: CartItemType,
    dispatch : React.Dispatch<ReducerAction>
    REDUCER_ACTIONS: ReducerActionType
}
export const CartLineItem = ({item,dispatch,REDUCER_ACTIONS}: PropsType) => {
    const img : string = new URL(`../images/${item.sku}.jpg`,import.meta.url).href
    const lineTotal: number = (item.qty * item.price)
    const highestQty: number = 20> item.qty ?20:item.qty
    const optionValues : number[] = [...Array(highestQty).keys()].map(i=>i+1)
    const options: ReactElement[] = optionValues.map(val =>{
        return <option value={val} key={`opt${val}`}>{val}</option>
    })

    const onChangeQty = (e:ChangeEvent<HTMLSelectElement>) => {
        dispatch ({
            type:REDUCER_ACTIONS.QUANTITY,
            payload: {...item, qty:Number(e.target.value)}
        })
    }
    const onRemoveFromCart = () => dispatch({
        type:REDUCER_ACTIONS.REMOVE,
        payload: item,
    })

    const content =(
        <li className='cart__item'>
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label='Item Name'>{item.name}</div>
            <div aria-label='Price per Item'>{new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(item.price)}</div>
            <label htmlFor="itemQty" className="offscreen">
                Item Quantity
            </label>
            <select 
                className='cart__select'
                name="itemQty"
                id="itemQty"
                value={item.qty}
                onChange={onChangeQty}
            >{options}
            </select>
            <div aria-label= "Line Item Subtotal" className="cart__item-subtotal">
                {new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(lineTotal)}
            </div>

            <button className='cart__button' aria-label='Remove Item From Cart' title='Remove Item From Cart' onClick={onRemoveFromCart}>
                ❌
            </button>
        </li>
    )
    return content
}
export default CartLineItem