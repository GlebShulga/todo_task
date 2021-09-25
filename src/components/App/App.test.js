import React from 'react';
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer'
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { history } from "../../redux";
import store from '../../redux';
import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = renderer.create(
//     <Provider store={store}>
//       <App />
//      </Provider>
//   );

//   expect(getByText(/To-Do List/i)).toBeInTheDocument();
// });

const mockPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: "/",
    search: "",
    hash: "",
    state: null,
    key: "5nvxpbdafa",
  }),
  useHistory: () => {
    const push = () => mockPush();
    return { push };
  },
}));

describe('App', () => {
  it('renders', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
  })
})

