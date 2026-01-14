import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { AuthContext } from "../context/AuthContext";

const baseValue = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isMember: false,
  isAdmin: false,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshAccessToken: async () => null,
};

export default {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthContext.Provider value={baseValue}>
          <Story />
        </AuthContext.Provider>
      </MemoryRouter>
    ),
  ],
};

export const Guest = {};

export const Member = {
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          ...baseValue,
          isAuthenticated: true,
          isMember: true,
          user: { first_name: "Maya", email: "maya@example.com", is_active: true },
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
};

export const Admin = {
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          ...baseValue,
          isAuthenticated: true,
          isAdmin: true,
          user: { first_name: "Admin", email: "admin@example.com", is_staff: true },
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
};
