import { useSelector, useDispatch } from '@/services/store';
import { updateUser } from '@/services/userSlice';
import { ProfileUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';

import type { TRegisterData } from '@/utils/burger-api';

export const Profile = (): React.JSX.Element => {
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);
  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name ?? '',
      email: user?.email ?? '',
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    const updateData: Partial<TRegisterData> = {
      name: formValue.name,
      email: formValue.email,
    };
    if (formValue.password !== '') {
      updateData.password = formValue.password;
    }
    async function saveChanges(): Promise<void> {
      try {
        await dispatch(updateUser(updateData)).unwrap();
        setFormValue((prevState) => ({
          ...prevState,
          password: '',
        }));
      } catch (error) {
        console.error('Не удалось обновить профиль', error);
      }
    }
    void saveChanges();
  };

  const handleCancel = (e: SyntheticEvent): void => {
    e.preventDefault();
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error ?? ''}
    />
  );
};
