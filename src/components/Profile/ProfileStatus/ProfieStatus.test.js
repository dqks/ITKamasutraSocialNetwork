// import {findByRole, fireEvent, getByRole, render, screen} from '@testing-library/react';
// import ProfileStatus from './ProfileStatus';
// import {Provider} from "react-redux";
// import { act } from 'react';
// import store from "../../../redux/reduxStore"
//
// test("status from props should be in the local state", async () => {
//     const handleChange = jest.fn()
//
//     render(
//         <Provider store={store}>
//             <ProfileStatus/>
//         </Provider>
//     )
//
//     const status = await screen.findByText('jjj');
//     expect(status).toBeInTheDocument();
//     // fireEvent.dblClick(status)
//     //
//     // const input = screen.getByRole('input')
//     // expect(input).toBeInTheDocument();
//
//
//
//     // fireEvent.change(input, { target: { value: 'a' } })
//     // expect(handleChange).toHaveBeenCalledTimes(1)
//     // expect(input.value).toBe('a')
// })