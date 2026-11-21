import { fetchOrderByNumber } from '@/services/orderDetailsSlice';
import { useSelector, useDispatch } from '@/services/store';
import { Preloader, OrderInfoUI } from '@ui';
import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { TIngredient } from '@utils-types';

export const OrderInfo = (): React.JSX.Element => {
  const orderData = useSelector((state) => state.orderDetails.order);
  const dispatch = useDispatch();

  const { number } = useParams();
  useEffect(() => {
    if (!number) return;
    const orderNumber = Number(number);
    if (!Number.isInteger(orderNumber) || orderNumber <= 0) {
      return;
    }
    void dispatch(fetchOrderByNumber(orderNumber));
  }, [dispatch, number]);

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1,
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <>
      <p className="text text_type_digits-default">
        #{String(orderInfo.number).padStart(6, '0')}
      </p>
      <OrderInfoUI orderInfo={orderInfo} />
    </>
  );
};
