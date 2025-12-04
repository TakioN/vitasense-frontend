import request from "./api";

export const updateIntake = async (id, status) => {
  await request.post("/alarms/check", { alarmId: id, status });
};
