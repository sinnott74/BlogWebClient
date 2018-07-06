/**
 * @jest-environment jsdom
 */
import optionsMenuReducer, {
  openOptionsMenu,
  closeOptionsMenu,
  toggleOptionsMenu,
  isOpened
} from "core/ducks/optionsMenu";

describe("Options Menu Ducks - ", () => {
  describe("Reducer", () => {
    it("should return its inital state", () => {
      const initialState = optionsMenuReducer(undefined, {});
      const expectInitialState = { opened: false };
      expect(initialState).toEqual(expectInitialState);
    });

    it("should handle being opened", () => {
      const state = optionsMenuReducer(undefined, openOptionsMenu());
      const expectedState = { opened: true };
      expect(state).toEqual(expectedState);
    });

    it("should handle being closed", () => {
      const state = optionsMenuReducer(undefined, closeOptionsMenu());
      const expectedState = { opened: false };
      expect(state).toEqual(expectedState);
    });

    it("should handle being toggled", () => {
      const state = optionsMenuReducer(undefined, toggleOptionsMenu());
      const expectedState = { opened: true };
      expect(state).toEqual(expectedState);

      const nextState = optionsMenuReducer(state, toggleOptionsMenu());
      const expectedNextState = { opened: false };
      expect(nextState).toEqual(expectedNextState);
    });
  });

  describe("Selectors", () => {
    it("isOpened should return true when state is opened", () => {
      const optionsMenuState = optionsMenuReducer(undefined, openOptionsMenu());
      const state = { optionsMenu: optionsMenuState };
      expect(isOpened(state)).toBe(true);
    });

    it("isOpened should return false when state is closed", () => {
      const optionsMenuState = optionsMenuReducer(
        undefined,
        closeOptionsMenu()
      );
      const state = { optionsMenu: optionsMenuState };
      expect(isOpened(state)).toBe(false);
    });
  });
});
