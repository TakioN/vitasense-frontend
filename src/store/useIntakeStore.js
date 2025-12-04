import { create } from "zustand";
import { updateIntake } from "../apis/alarmApis";

const useIntakeStore = create((set) => ({
  isIntakeMap: new Map(),

  initIntakeMap: (alarms) =>
    set(() => {
      const newMap = new Map();
      for (let alarm of alarms) {
        if (alarm.intake_status === "복용") newMap.set(alarm.alarm_id, true);
        else newMap.set(alarm.alarm_id, false);
      }
      return { isIntakeMap: newMap };
    }),
  updateIsIntake: async (id) => {
    let statusBool;
    set((state) => {
      const current = state.isIntakeMap.get(id);
      if (current !== undefined) {
        const newMap = new Map(state.isIntakeMap);
        newMap.set(id, !current);
        statusBool = !current;
        return { isIntakeMap: newMap };
      }
      return state;
    });

    const status = statusBool ? "복용" : "미복용";
    await updateIntake(id, status);
  },
}));

export default useIntakeStore;
