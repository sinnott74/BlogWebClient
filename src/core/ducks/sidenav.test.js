/**
 * @jest-environment jsdom
 */
import sidenavReducer, {
  openSideNav,
  closeSideNav,
  toggleSideNav,
  isOpened
} from "core/ducks/sidenav";

describe("SideNav Ducks - ", () => {
  describe("Reducer", () => {
    it("should return its inital state", () => {
      const initialState = sidenavReducer(undefined, {});
      const expectInitialState = { opened: false };
      expect(initialState).toEqual(expectInitialState);
    });

    it("should handle being opened", () => {
      const state = sidenavReducer(undefined, openSideNav());
      const expectedState = { opened: true };
      expect(state).toEqual(expectedState);
    });

    it("should handle being closed", () => {
      const state = sidenavReducer(undefined, closeSideNav());
      const expectedState = { opened: false };
      expect(state).toEqual(expectedState);
    });

    it("should handle being toggled", () => {
      const state = sidenavReducer(undefined, toggleSideNav());
      const expectedState = { opened: true };
      expect(state).toEqual(expectedState);

      const nextState = sidenavReducer(state, toggleSideNav());
      const expectedNextState = { opened: false };
      expect(nextState).toEqual(expectedNextState);
    });
  });

  describe("Selectors", () => {
    it("isOpened should return true when state is opened", () => {
      const sidenavState = sidenavReducer(undefined, openSideNav());
      const state = { sidenav: sidenavState };
      expect(isOpened(state)).toBe(true);
    });

    it("isOpened should return false when state is closed", () => {
      const sidenavState = sidenavReducer(undefined, closeSideNav());
      const state = { sidenav: sidenavState };
      expect(isOpened(state)).toBe(false);
    });
  });
});
